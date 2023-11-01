import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [],
})
export class SharedModule { }
