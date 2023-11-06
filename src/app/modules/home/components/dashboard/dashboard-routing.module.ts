import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GestionarCategoriasComponent } from './components/gestionar-categorias/gestionar-categorias.component';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos.component';
import { HomeComponent } from './components/home/home.component';
import { RouterConstant } from 'src/app/constants/routes/router.constant';
import { SharedModule } from 'src/app/shared/shared.module';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: RouterConstant.ROUTER_CATEGORIES,
    component: GestionarCategoriasComponent
  },
  {
    path: RouterConstant.ROUTER_PRODUCTS,
    component: GestionarProductosComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    GestionarCategoriasComponent,
    GestionarProductosComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength, actualLength }) =>
                      `Cantidad de caracteres mínima ${requiredLength} actual ${actualLength}`,
          maxlength: ({ requiredLength, actualLength }) =>
                      `Cantidad máxima de caracteres ${requiredLength} actual ${actualLength}`,
        }
      }
    })
  ]
})
export class DashboardRoutingModule { }
