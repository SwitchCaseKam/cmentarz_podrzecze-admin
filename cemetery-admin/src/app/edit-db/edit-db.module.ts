import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDbRoutingModule } from './edit-db-routing.module';
import { EditDbComponent } from './edit-db.component';
import { EditSingleRecordComponent } from './edit-single-record/edit-single-record.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditDbComponent,
    EditSingleRecordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditDbRoutingModule
  ]
})
export class EditDbModule { }
