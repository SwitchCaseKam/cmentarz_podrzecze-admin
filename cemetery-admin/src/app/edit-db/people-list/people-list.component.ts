import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditSingleRecordComponent } from '../edit-single-record/edit-single-record.component';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  protected allPeople: Person[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private dataApisService: DataApiService
  ) { }

  public ngOnInit(): void {
    this.dataService.getDataFromServer();
    this.dataService.getAllPeople().pipe().subscribe(
      (people: Person[]) => 
        this.allPeople = people.sort((a, b) => a.surname.localeCompare(b.surname, 'pl', { ignorePunctuation: true }))
    );
  }

  public editCurrentPerson(person: Person): void {
    this.router.navigate(['edit-db/edit', person.id], {state: person});
  }

  public deleteCurrentPerson(person: Person): void {
    this.dataApisService.deletePerson(person.id).subscribe(d => console.log(d));
    this.dataService.getAllPeople().pipe().subscribe(
      (people: Person[]) => 
        this.allPeople = people.sort((a, b) => a.surname.localeCompare(b.surname, 'pl', { ignorePunctuation: true }))
    );
  }

}
