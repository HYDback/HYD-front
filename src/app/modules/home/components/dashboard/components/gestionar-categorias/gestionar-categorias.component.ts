import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryApiService } from '../../services/categoria-api.service';
import { DashboardApiService } from '../../services/dashboard-api.service';

@Component({
  selector: 'app-gestionar-categorias',
  templateUrl: './gestionar-categorias.component.html',
  styleUrls: ['./gestionar-categorias.component.scss']
})
export class GestionarCategoriasComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoriaApiService: CategoryApiService,
    private dashboardApiService: DashboardApiService
    ) { }
  public filterForm!: FormGroup;
  public categoriaForm!: FormGroup;
  public estados = [
    { id: 1, label: 'ACTIVO' },
    { id: 2, label: 'INACTIVO' }
  ]
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public categorias = [];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      nombre: ['', [Validators.maxLength(20)]],
      estado: ['']
    })
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      estado: ['', [Validators.required]]
    })
  }

  showModalCrear(): void {
    this.categoriaForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  filterCategoria(): void {
    this.hasFirstFilter = true;
    this.categoriaApiService.getCategoriasByFilter(this.dashboardApiService.getParams(this.filterForm.value)).subscribe({
      next: (data) => {
        this.categorias = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar las categorias' });
      }
    })
  }

  saveCategoria(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear la categoría?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriaApiService.saveCategoria(this.categoriaForm.value).subscribe({
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

  updateCategoria(categoria: any): void {
    let message = categoria.estado == 'ACTIVO' ? 'inactivar' : 'activar';
    this.confirmationService.confirm({
      message: `¿Está seguro que desea ${message} la categoría?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        categoria.estado = categoria.estado == 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        this.categoriaApiService.updateCategoria(categoria).subscribe({
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
