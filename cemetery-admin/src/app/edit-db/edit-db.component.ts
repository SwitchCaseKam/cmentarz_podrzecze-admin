import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-edit-db',
  templateUrl: './edit-db.component.html',
  styleUrls: ['./edit-db.component.css']
})
export class EditDbComponent implements OnInit, OnDestroy {

  constructor() { }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {
    console.log('edit-db onDestroy')
  }

}
