import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { GestionarCategoriasComponent } from './components/gestionar-categorias/gestionar-categorias.component';
import { GestionarProductosComponent } from './components/gestionar-productos/gestionar-productos.component';
import { GestionarClientesComponent } from './components/gestionar-clientes/gestionar-clientes.component';
import { GestionarIngresosComponent } from './components/gestionar-ingresos/gestionar-ingresos.component';
import { GestionarEgresosComponent } from './components/gestionar-egresos/gestionar-egresos.component';
import { GestionarOperadoresComponent } from './components/gestionar-operadores/gestionar-operadores.component';
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
  },
  {
    path: RouterConstant.ROUTER_CLIENTS,
    component: GestionarClientesComponent
  },
  {
    path: RouterConstant.ROUTER_INGRESOS,
    component: GestionarIngresosComponent
  },
  {
    path: RouterConstant.ROUTER_EGRESOS,
    component: GestionarEgresosComponent
  },
  {
    path: RouterConstant.ROUTER_OPERADORES,
    component: GestionarOperadoresComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    GestionarCategoriasComponent,
    GestionarProductosComponent,
    HomeComponent,
    GestionarClientesComponent,
    GestionarIngresosComponent,
    GestionarEgresosComponent,
    GestionarOperadoresComponent
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
