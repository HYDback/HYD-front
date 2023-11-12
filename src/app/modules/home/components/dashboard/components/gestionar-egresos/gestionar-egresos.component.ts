import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoryApiService } from '../../services/categoria-api.service';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ProductApiService } from '../../services/producto-api.service';
import { EgresoApiService } from '../../services/egreso-api.service';
import { ClientApiService } from '../../services/cliente-api.service.ts.service';

@Component({
  selector: 'app-gestionar-egresos',
  templateUrl: './gestionar-egresos.component.html',
  styleUrls: ['./gestionar-egresos.component.scss']
})
export class GestionarEgresosComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private categoriaApiService: CategoryApiService,
    private productoApiService: ProductApiService,
    private egresoApiService: EgresoApiService,
    private clienteApiService: ClientApiService,
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
  public clientes: any = [];
  public egresos: any = [];
  public egresosAux: any = [];
  public cliente_id: any;

  ngOnInit(): void {
    this.initForm();
    this.getCategorias();
    this.getProductos();
    this.getClientes();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      dateIni: [''],
      dateFin: [''],
      producto_id: [''],
      cliente_id: ['']
    })
    this.productoFilterForm = this.fb.group({
      nombre: ['', [Validators.maxLength(20)]],
      estado: [''],
      categoria_id: ['']
    })
  }

  showModalCrear(): void {
    this.productoFilterForm.reset();
    this.cliente_id = null;
    this.egresosAux = [];
    this.productos = [];
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  getClientes(): void {
    this.clienteApiService.getClientesByFilter(this.dashboardApiService.getParams({ estado: 'ACTIVO' })).subscribe({
      next: (data) => {
        this.clientes = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
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
    const filter = Object.assign(this.productoFilterForm.value, {cantidad: 1})
    this.productoApiService.getProductosByFilter(this.dashboardApiService.getParams(filter)).subscribe({
      next: (data) => {
        this.productos = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterEgreso(): void {
    this.hasFirstFilter = true;
    this.egresoApiService.getEgresosByFilter(this.dashboardApiService.getParams(this.filterForm.value)).subscribe({
      next: (data) => {
        this.egresos = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  saveEgreso(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el egreso?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const egresos = this.egresosAux.map((egreso: any) => {
          return [egreso.cantidad, egreso.fecha, egreso.producto_id, egreso.usuario_id, this.cliente_id]
        })
        this.egresoApiService.saveEgresos({egresos: egresos}).subscribe({
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
    const egreso = this.egresosAux.filter((egreso: any) => egreso.producto_id == producto.id);
    if (egreso.length > 0) {
      const isValid = egreso[0].cantidad < egreso[0].stock;
      egreso[0].cantidad = isValid ? (egreso[0].cantidad + 1) : egreso[0].cantidad;
      return;
    }
    let date = new Date();
    let usuario = JSON.parse(sessionStorage.getItem('AUTH')!).cedula;
    this.egresosAux.push({
      cantidad: 1,
      fecha: date,
      producto_id: producto.id,
      usuario_id: usuario,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria_nombre,
      stock: producto.cantidad
    })
    console.log(this.egresosAux)
    console.log(this.cliente_id)

  }

  changeCantidad(operation: any, egreso: any) {
    const isIncrement = operation === '+' && egreso.cantidad < egreso.stock;
    const isDecrement = operation === '-' && (egreso.cantidad > 1 && (egreso.cantidad < egreso.stock));
    if (isIncrement || isDecrement) {
      egreso.cantidad += isIncrement ? 1 : -1;
    }
  }

  removeEgreso(egreso: any){
    const index = this.egresosAux.indexOf(egreso);
    if (index !== -1) {
      this.egresosAux.splice(index, 1);
    }
  }
}
