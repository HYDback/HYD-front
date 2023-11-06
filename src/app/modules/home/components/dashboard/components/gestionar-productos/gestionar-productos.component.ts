import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { CategoryApiService } from '../../services/categoria-api.service';
import { ProductApiService } from '../../services/producto-api.service';

@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-productos.component.html',
  styleUrls: ['./gestionar-productos.component.scss']
})
export class GestionarProductosComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoriaApiService: CategoryApiService,
    private productoApiService: ProductApiService,
    private dashboardApiService: DashboardApiService
    ) { }
  public filterForm!: FormGroup;
  public productoForm!: FormGroup;
  public estados = [
    { id: 1, label: 'ACTIVO' },
    { id: 2, label: 'INACTIVO' }
  ]
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public categorias = [];
  public productos = [];

  ngOnInit(): void {
    this.initForm();
    this.getCategorias();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      nombre: ['', [Validators.maxLength(20)]],
      estado: [''],
      categoria_id: ['']
    })
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      cantidad: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]]
    })
  }

  showModalCrear(): void {
    this.productoForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  getCategorias(): void {
    this.categoriaApiService.getCategoriasByFilter(this.dashboardApiService.getParams({estado: 'ACTIVO'})).subscribe({
      next: (data) => {
        this.categorias = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterProducto(): void {
    this.hasFirstFilter = true;
    this.productoApiService.getProductosByFilter(this.dashboardApiService.getParams(this.filterForm.value)).subscribe({
      next: (data) => {
        this.productos = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  saveProducto(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productoApiService.saveProducto(this.productoForm.value).subscribe({
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

  updateProducto(producto: any): void {
    let message = producto.estado == 'ACTIVO' ? 'inactivar' : 'activar';
    this.confirmationService.confirm({
      message: `¿Está seguro que desea ${message} el producto?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        producto.estado = producto.estado == 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        this.productoApiService.updateProducto(producto).subscribe({
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
