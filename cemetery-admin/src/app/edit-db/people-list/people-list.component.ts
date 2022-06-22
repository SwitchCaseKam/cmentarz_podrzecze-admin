import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';

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
  ) { }

  public ngOnInit(): void {
    this.dataService.getDataFromServer();
    this.dataService.getAllPeople().subscribe(
      (people: Person[]) => this.allPeople = people
    );
  }

  public onRowClick(person: Person): void {
    console.log('edit person: ', person);
    this.router.navigate(['edit-db/edit', person.id]);

  }

}
