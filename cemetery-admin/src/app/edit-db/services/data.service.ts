import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataApiService } from './data-api.service';
import { DatabaseDate } from '../models/databaseDate.model';
import { Person } from '../models/person.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allPeople: Person[] = [];
  private allPeopleSubject = new BehaviorSubject<Person[]>(this.allPeople);

  private databaseDate: string = '';
  private databaseDateSubject = new BehaviorSubject<string>(this.databaseDate);

  constructor(private dataApiService: DataApiService) { }

  public getDataFromServer(): void {
    this.getAllPeopleFromServer();
    this.getDatabaseDateFromServer();
  }

  public getAllPeople(): Observable<Person[]> {
    return this.allPeopleSubject.asObservable();
  }

  public getDatabaseDate(): Observable<string> {
    return this.databaseDateSubject.asObservable();
  }

  private getAllPeopleFromServer(): void {
    this.dataApiService.getAllPeople().subscribe(
      (people: Person[]) => {
        this.allPeople = people;
        this.allPeopleSubject.next(this.allPeople);
      }
    );
  }

  private getDatabaseDateFromServer(): void {
    this.dataApiService.getDatabaseDate().subscribe(
      (dbDate: DatabaseDate) => {
        this.databaseDate = dbDate?.modifiedDate;
        this.databaseDateSubject.next(this.databaseDate);
      }
    );
  }


}
