import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryApiService } from '../../services/categoria-api.service';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ProductApiService } from '../../services/producto-api.service';
import { IngresoApiService } from '../../services/ingreso-api.service';

@Component({
  selector: 'app-gestionar-ingresos',
  templateUrl: './gestionar-ingresos.component.html',
  styleUrls: ['./gestionar-ingresos.component.scss']
})
export class GestionarIngresosComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoriaApiService: CategoryApiService,
    private productoApiService: ProductApiService,
    private ingresoApiService: IngresoApiService,
    private dashboardApiService: DashboardApiService
  ) { }
  public filterForm!: FormGroup;
  public productoFilterForm!: FormGroup;
  public estados = [
    { id: 1, label: 'ACTIVO' },
    { id: 2, label: 'INACTIVO' }
  ]
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public categorias: any = [];
  public productosAux: any = [];
  public productos: any = [];
  public ingresos: any = [];
  public ingresosAux: any = [];

  ngOnInit(): void {
    this.initForm();
    this.getCategorias();
    this.getProductos();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      dateIni: [''],
      dateFin: [''],
      producto_id: ['']
    })
    this.productoFilterForm = this.fb.group({
      nombre: ['', [Validators.maxLength(20)]],
      estado: [''],
      categoria_id: ['']
    })
  }

  showModalCrear(): void {
    this.productoFilterForm.reset();
    this.ingresosAux = [];
    this.productos = [];
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  getCategorias(): void {
    this.categoriaApiService.getCategoriasByFilter(this.dashboardApiService.getParams({ estado: 'ACTIVO' })).subscribe({
      next: (data) => {
        this.categorias = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  getProductos(): void {
    this.productoApiService.getProductosByFilter({estado: 'ACTIVO'}).subscribe({
      next: (data) => {
        this.productosAux = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterProducto(): void {
    this.hasFirstFilter = true;
    this.productoFilterForm.controls['estado'].setValue('ACTIVO');
    this.productoApiService.getProductosByFilter(this.dashboardApiService.getParams(this.productoFilterForm.value)).subscribe({
      next: (data) => {
        this.productos = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterIngreso(): void {
    this.hasFirstFilter = true;
    this.ingresoApiService.getIngresosByFilter(this.dashboardApiService.getParams(this.filterForm.value)).subscribe({
      next: (data) => {
        this.ingresos = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  saveIngreso(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el producto?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ingresos = this.ingresosAux.map((ingreso: any) => {
          return [ingreso.cantidad, ingreso.fecha, ingreso.producto_id, ingreso.usuario_id]
        })
        this.ingresoApiService.saveIngresos({ingresos: ingresos}).subscribe({
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

  addProduct(producto: any) {
    const ingreso = this.ingresosAux.filter((ingreso: any) => ingreso.producto_id == producto.id);
    if (ingreso.length > 0) {
      ingreso[0].cantidad = ingreso[0].cantidad + 1;
      return;
    }
    let date = new Date();
    let usuario = JSON.parse(sessionStorage.getItem('AUTH')!).cedula;
    this.ingresosAux.push({
      cantidad: 1,
      fecha: date,
      producto_id: producto.id,
      usuario_id: usuario,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria_nombre,
      stock: producto.cantidad
    })
    console.log(date)
    console.log(date.getTime())
    console.log(date.getDate())
  }

  changeCantidad(operation: any, ingreso: any) {
    const isIncrement = operation === '+';
    const isDecrement = operation === '-' && ingreso.cantidad > 1;
    if (isIncrement || isDecrement) {
      ingreso.cantidad += isIncrement ? 1 : -1;
    }
  }

  removeIngreso(ingreso: any){
    const index = this.ingresosAux.indexOf(ingreso);
    if (index !== -1) {
      this.ingresosAux.splice(index, 1);
    }
  }
}
