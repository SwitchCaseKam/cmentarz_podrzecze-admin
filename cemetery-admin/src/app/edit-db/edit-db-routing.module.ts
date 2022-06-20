import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDbComponent } from './edit-db.component';

const routes: Routes = [{ path: '', component: EditDbComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDbRoutingModule { }
