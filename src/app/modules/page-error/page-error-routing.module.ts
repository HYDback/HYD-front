import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent } from './page-error.component';


const routes: Routes = [
  {
    path: '',
    component: PageErrorComponent
  }
]

@NgModule({
  declarations: [PageErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PageErrorRoutingModule { }
