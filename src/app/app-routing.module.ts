import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RouterConstant } from './constants/routes/router.constant';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: RouterConstant.ROUTER_LOGIN,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: RouterConstant.ROUTER_ERROR,
    loadChildren: () => import('./modules/page-error/page-error.module').then(m => m.PageErrorModule)
  },
  {
    path: RouterConstant.ROUTER_HOME,
    canActivate: [authGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: RouterConstant.ROUTER_LOGIN,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: RouterConstant.ROUTER_LOGIN,
    pathMatch: 'full'
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
