import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientApiService } from '../../services/cliente-api.service.ts.service';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { EgresoApiService } from '../../services/egreso-api.service';
import { ProductApiService } from '../../services/producto-api.service';
import { IngresoApiService } from '../../services/ingreso-api.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-gestionar-reportes',
  templateUrl: './gestionar-reportes.component.html',
  styleUrls: ['./gestionar-reportes.component.scss']
})
export class GestionarReportesComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private egresoApiService: EgresoApiService,
    private ingresoApiService: IngresoApiService,
    private clienteApiService: ClientApiService,
    private productoApiService: ProductApiService,
    private dashboardApiService: DashboardApiService
  ) { }
  public filterForm!: FormGroup;
  public estados = [
    { id: 1, label: 'ACTIVO' },
    { id: 2, label: 'INACTIVO' }
  ]
  public tipos = [
    { id: 1, label: 'Ingresos' },
    { id: 2, label: 'Egresos' }
  ]
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public clientes: any = [];
  public reportes: any = [];
  public productos: any = [];


  ngOnInit(): void {
    this.initForm();
    this.getClientes();
    this.getProductos();

  }

  initForm(): void {
    this.filterForm = this.fb.group({
      tipo: ['', [Validators.required]],
      dateIni: [''],
      dateFin: [''],
      producto_id: [''],
      cliente_id: ['']
    })
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

  getProductos(): void {
    this.productoApiService.getProductosByFilter({estado: 'ACTIVO'}).subscribe({
      next: (data) => {
        this.productos = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterReportes(): void {
    this.hasFirstFilter = true;
    let __api = this.filterForm.controls['tipo'].value == 'Ingresos' ? this.ingresoApiService.getIngresosByFilter(this.dashboardApiService.getParams(this.filterForm.value)) : this.egresoApiService.getEgresosByFilter(this.dashboardApiService.getParams(this.filterForm.value))
    __api.subscribe({
      next: (data) => {
        this.reportes = data.Resp.data;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  generarReporte(): void {
    if(this.reportes.length > 0){
      this.confirmationService.confirm({
        message: '¿Está seguro que desea generar el reporte?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const date = new Date();
          const doc = new jsPDF('p', 'mm', 'a4');
          doc.text(`Reporte de ${this.filterForm.controls['tipo'].value} HYD`, 75, 10);
          doc.text(`Fecha: ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, 80, 20);
          autoTable(doc, {
            headStyles: { fillColor: [8, 44, 116], textColor: [255, 255, 255], cellPadding: 4 },
            bodyStyles: { cellPadding: 4 },
            margin: { top: 35 },
            head: [this.filterForm.controls['tipo'].value == 'Ingresos' ? ['Producto', 'Cantidad', 'Fecha', 'Ingresado por'] : ['Producto', 'Cantidad', 'Fecha', 'Ingresado por', 'Cliente']],
            body: this.convertArrayToBody(),
          })
          doc.save('Reporte.pdf')
        }
      });
    }
  }

  convertArrayToBody(){
    let body: any[] = [];
    this.reportes.forEach((element: any) => {
      let aux = this.filterForm.controls['tipo'].value == 'Ingresos' ? [element.nombreproducto, element.cantidad, element.fecha, element.nombreusuario] : [element.nombreproducto, element.cantidad, element.fecha, element.nombreusuario, element.nombrecliente]
      body.push(aux);
    });
    return body;
  }

  clearTable(){
    this.reportes = [];
  }
}
