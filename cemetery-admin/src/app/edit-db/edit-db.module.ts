import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDbRoutingModule } from './edit-db-routing.module';
import { EditDbComponent } from './edit-db.component';


@NgModule({
  declarations: [
    EditDbComponent
  ],
  imports: [
    CommonModule,
    EditDbRoutingModule
  ]
})
export class EditDbModule { }
