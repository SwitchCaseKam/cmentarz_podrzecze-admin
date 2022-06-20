import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './models/person.model';
import { DatabaseDate } from './models/databaseDate.model';
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

  public addNewPerson(newPersonData: Person) {
    return this.http.post<Person>(`${this.apiUrl}/${tombServerEndpoints.PEOPLE}`, newPersonData);
  }

  public updateDbDate() {
    const date = new Date();
    const fullTodayDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;  
    return this.http.post<DatabaseDate>(`${this.apiUrl}/${tombServerEndpoints.PEOPLE}`, {modifiedDate: fullTodayDate});
  }
}
