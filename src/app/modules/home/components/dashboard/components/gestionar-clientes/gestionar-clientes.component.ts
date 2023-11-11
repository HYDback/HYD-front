import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ClientApiService } from '../../services/cliente-api.service.ts.service';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.scss']
})
export class GestionarClientesComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private clienteApiService: ClientApiService,
    private dashboardApiService: DashboardApiService
    ) { }
  public filterForm!: FormGroup;
  public clienteForm!: FormGroup;
  public estados = [
    { id: 1, label: 'ACTIVO' },
    { id: 2, label: 'INACTIVO' }
  ]
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public clientes = [];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      nombre: ['', [Validators.maxLength(30)]],
      cedula: [''],
      estado: ['']
    })
    this.clienteForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.maxLength(20)]],
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      apellido: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', [Validators.required]]
    })
  }

  showModalCrear(): void {
    this.clienteForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  filterCliente(): void {
    this.hasFirstFilter = true;
    this.clienteApiService.getClientesByFilter(this.dashboardApiService.getParams(this.filterForm.value)).subscribe({
      next: (data) => {
        this.clientes = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  saveCliente(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteApiService.saveCliente(this.clienteForm.value).subscribe({
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

  updateCliente(cliente: any): void {
    let message = cliente.estado == 'ACTIVO' ? 'inactivar' : 'activar';
    this.confirmationService.confirm({
      message: `¿Está seguro que desea ${message} el cliente?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        cliente.estado = cliente.estado == 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        this.clienteApiService.updateCliente(cliente).subscribe({
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
