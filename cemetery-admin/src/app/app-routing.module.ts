import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'edit-db', loadChildren: () => import('./edit-db/edit-db.module').then(m => m.EditDbModule) },
  { path: '**', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
