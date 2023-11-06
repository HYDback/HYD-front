import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterConstant } from 'src/app/constants/routes/router.constant';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: RouterConstant.ROUTER_DASHBOARD,
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
]

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
