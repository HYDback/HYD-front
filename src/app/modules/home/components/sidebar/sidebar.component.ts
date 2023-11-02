import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router, private route: ActivatedRoute){}

  public isExpanded = false;
  public showButtons = false;
  public buttons = [
    {
      path: '',
      label: 'Inventario',
      icon: 'pi pi-box',
      expanded: false,
      expand: function (){
        this.expanded = !this.expanded;
      },
      childrens: [
        {
          path: 'categories',
          label: 'Categorias',
          icon: 'pi pi-chart-bar',
        },
        {
          path: 'products',
          label: 'Productos',
          icon: 'pi pi-cloud',
        }
      ]
    },
    {
      path: 'config',
      label: 'Inventario 2',
      icon: 'pi pi-briefcase',
      expanded: false,
      expand: function (){
        this.expanded = !this.expanded;
      },
      childrens: []
    },
    {
      path: '',
      label: 'Inventario 3',
      icon: 'pi pi-cog',
      expanded: false,
      expand: function (){
        this.expanded = !this.expanded;
      },
      childrens: [
        {
          path: '',
          label: 'Categorias',
          icon: 'pi pi-box',
        },
        {
          path: '',
          label: 'Productos',
          icon: 'pi pi-box',
        }
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
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  goTo(path: string){
    this.toggleSidebar();
    this.router.navigate([`${this.router.url}/${path}`])
  }

}
