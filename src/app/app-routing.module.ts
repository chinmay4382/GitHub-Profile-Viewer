import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
//
import {ListComponent} from './User/list/list.component';
import {DetailComponent} from './User/detail/detail.component';


const routes: Routes = [
  {path: 'search', component: ListComponent},
  {path: 'user/:id', component: DetailComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
