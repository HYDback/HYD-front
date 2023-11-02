import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GestionarCategoriasComponent } from './components/gestionar-categorias/gestionar-categorias.component';
import { HomeComponent } from './components/home/home.component';
import { RouterConstant } from 'src/app/constants/routes/router.constant';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: RouterConstant.ROUTER_CATEGORIES,
    component: GestionarCategoriasComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    GestionarCategoriasComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
