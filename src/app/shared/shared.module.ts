import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http'
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { KeyFilterModule } from 'primeng/keyfilter';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    errorTailorImports,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
    DialogModule,
    InputTextareaModule,
    errorTailorImports,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
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
export class SharedModule { }
