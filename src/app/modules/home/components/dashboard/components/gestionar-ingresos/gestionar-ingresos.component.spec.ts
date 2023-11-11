import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarIngresosComponent } from './gestionar-ingresos.component';

describe('GestionarIngresosComponent', () => {
  let component: GestionarIngresosComponent;
  let fixture: ComponentFixture<GestionarIngresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarIngresosComponent]
    });
    fixture = TestBed.createComponent(GestionarIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
