import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DataApiService } from '../services/data-api.service';
import { Subscription, take } from 'rxjs';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  protected allPeople: Person[] = [];
  private dataSubscription = new Subscription();
  protected errorMessage = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private scroller: ViewportScroller,
    private dataApisService: DataApiService
  ) { }

  public ngOnInit(): void {
    this.dataService.getDataFromServer();
    this.refreshPeopleData();
  }

  private refreshPeopleData() {
    this.dataSubscription = this.dataService.getAllPeople().pipe().subscribe(
      (people: Person[]) => this.allPeople = people.sort((a, b) => a.surname.localeCompare(b.surname, 'pl', { ignorePunctuation: true }))
    );
  }

  public ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  public editCurrentPerson(person: Person): void {
    this.router.navigate(['edit-db/edit', person.id], {state: person});
  }

  public deleteCurrentPerson(person: Person): void {
    this.dataApisService.deletePerson(person.id).pipe(take(1)).subscribe(
      d => this.errorMessage = '',
      error => { 
        this.errorMessage = `Wystąpił błąd. Spróbuj ponownie za chwilę. ${error?.status}, ${error?.message}`;
        this.scroller.scrollToAnchor("header");
      }
    );
    this.refreshPeopleData();
  }

}
