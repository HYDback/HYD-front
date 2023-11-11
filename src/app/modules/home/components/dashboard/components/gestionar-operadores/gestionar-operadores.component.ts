import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { OperadorApiService } from '../../services/operador-api.service';

@Component({
  selector: 'app-gestionar-operadores',
  templateUrl: './gestionar-operadores.component.html',
  styleUrls: ['./gestionar-operadores.component.scss']
})
export class GestionarOperadoresComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private operadorApiService: OperadorApiService,
    private dashboardApiService: DashboardApiService
    ) { }
  public filterForm!: FormGroup;
  public operadorForm!: FormGroup;
  public estados = [
    { id: 1, label: 'ACTIVO' },
    { id: 2, label: 'INACTIVO' }
  ]
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public operadores = [];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      nombre: ['', [Validators.maxLength(60)]],
      cedula: [''],
      estado: ['']
    })
    this.operadorForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      correo: ['', [Validators.required, Validators.email]],
      nick: ['', [Validators.required]],
      contra: ['', [Validators.required]],
      tipo: [''],
      estado: ['', [Validators.required]]
    })
  }

  showModalCrear(): void {
    this.operadorForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  filterOperador(): void {
    this.hasFirstFilter = true;
    this.operadorApiService.getOperadoresByFilter(this.dashboardApiService.getParams(this.filterForm.value)).subscribe({
      next: (data) => {
        this.operadores = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  saveOperador(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.operadorForm.controls['tipo'].setValue('Operador');
        this.operadorApiService.saveOperador(this.operadorForm.value).subscribe({
          next: (data) => {
            this.closeModalCrear();
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha registrado exitosamente' });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido realizar el registro' });
          }
        })

      }
    });
  }

  updateOperador(operador: any): void {
    let message = operador.estado == 'ACTIVO' ? 'inactivar' : 'activar';
    this.confirmationService.confirm({
      message: `¿Está seguro que desea ${message} el operador?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        operador.estado = operador.estado == 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        this.operadorApiService.updateOperador(operador).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha cambiado el estado exitosamente' });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cambiar el estado' });
          }
        })

      }
    });
  }
}
