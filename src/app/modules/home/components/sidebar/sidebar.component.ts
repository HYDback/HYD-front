import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router, private route: ActivatedRoute){}
  @Output() state = new EventEmitter();
  public isExpanded = false;
  public showButtons = false;
  public buttons = [
    {
      id: 1,
      path: '',
      label: 'Inventario',
      icon: 'pi pi-box',
      expanded: false,
      expand: () => {
        this.toggleSubmenu(1)
      },
      childrens: [
        {
          path: 'categories',
          label: 'Gestionar Categorias',
          icon: 'pi pi-chart-bar',
        },
        {
          path: 'products',
          label: 'Gestionar Productos',
          icon: 'pi pi-table',
        },
        {
          path: 'clients',
          label: 'Gestionar Clientes',
          icon: 'pi pi-user',
        },
        {
          path: 'operators',
          label: 'Gestionar Operadores',
          icon: 'pi pi-user',
        }
      ]
    },
    {
      id: 2,
      path: '',
      label: 'Operaciones',
      icon: 'pi pi-briefcase',
      expanded: false,
      expand: () => {
        this.toggleSubmenu(2)
      },
      childrens: [
        {
          path: 'incomes',
          label: 'Gestionar Ingresos',
          icon: 'pi pi-sort-amount-up',
        },
        {
          path: 'expenses',
          label: 'Gestionar Egresos',
          icon: 'pi pi-sort-amount-down',
        }
      ]
    },
    {
      id: 3,
      path: '',
      label: 'Reportes',
      icon: 'pi pi-cog',
      expanded: false,
      expand: () => {
        this.toggleSubmenu(3)
      },
      childrens: [
        {
          path: '',
          label: 'Generar reportes',
          icon: 'pi pi-chart-line',
        },
      ]
    }
  ]

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.showButtons = !this.showButtons;
    if(!this.isExpanded){
      this.buttons = this.buttons.map((button) => {
        button.expanded = false;
        return button;
      })
    }
    this.state.emit(this.isExpanded);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  goTo(path: string){
    this.toggleSidebar();
    this.router.navigate([`home/dashboard/${path}`])
  }

  toggleSubmenu(id: number){
    this.buttons.forEach((item, index) => {
      if((index+1)==id){
        item.expanded = !item.expanded;
      }else{
        item.expanded = false;
      }
    })
  }

}
