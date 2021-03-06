import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDbRoutingModule } from './edit-db-routing.module';
import { EditDbComponent } from './edit-db.component';
import { EditSingleRecordComponent } from './edit-single-record/edit-single-record.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PeopleListComponent } from './people-list/people-list.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    EditDbComponent,
    EditSingleRecordComponent,
    PeopleListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditDbRoutingModule,
    MatDialogModule
  ]
})
export class EditDbModule { }
