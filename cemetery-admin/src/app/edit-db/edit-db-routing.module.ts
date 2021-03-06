import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDbComponent } from './edit-db.component';
import { EditSingleRecordComponent } from './edit-single-record/edit-single-record.component';
import { PeopleListComponent } from './people-list/people-list.component';

const routes: Routes = [
  { path: '', component: EditDbComponent },
  { path: 'add', component: EditSingleRecordComponent },
  { path: 'edit', component: PeopleListComponent },
  { path: 'edit/:id', component: EditSingleRecordComponent },
  { path: 'delete', component: EditSingleRecordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDbRoutingModule { }
