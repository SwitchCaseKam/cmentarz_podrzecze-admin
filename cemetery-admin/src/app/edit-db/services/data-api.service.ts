import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person.model';
import { DatabaseDate } from '../models/databaseDate.model';
import { Observable } from 'rxjs';

enum tombServerEndpoints {
  PEOPLE = 'people',
  DATE = 'date'
}

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private apiUrl = 'http://localhost:3000';
  // private apiUrl = 'https://test-node-tomb-server.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/${tombServerEndpoints.PEOPLE}`);
  }

  public getDatabaseDate(): Observable<DatabaseDate> {
    return this.http.get<DatabaseDate>(`${this.apiUrl}/${tombServerEndpoints.DATE}`);
  }

  public addNewPerson(newPersonData: Person): Observable<Person>{
    return this.http.post<Person>(`${this.apiUrl}/${tombServerEndpoints.PEOPLE}`, newPersonData);
  }

  public editPerson(newPersonData: Person, personId: number): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${tombServerEndpoints.PEOPLE}/${personId}`, newPersonData);
  }

  public updateDbDate(): Observable<DatabaseDate> {
    const date = new Date();
    const extra = date.getMonth() < 9 ? '0' : '';
    const fullTodayDate = `${date.getDate()}.${extra}${date.getMonth() + 1}.${date.getFullYear()}`;  
    return this.http.put<DatabaseDate>(`${this.apiUrl}/${tombServerEndpoints.DATE}/0`, {modifiedDate: fullTodayDate});
  }

  public deletePerson(personId: number) {
    return this.http.delete<Person>(`${this.apiUrl}/${tombServerEndpoints.PEOPLE}/${personId}`);
  }
}
