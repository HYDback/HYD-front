import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEgresosComponent } from './gestionar-egresos.component';

describe('GestionarEgresosComponent', () => {
  let component: GestionarEgresosComponent;
  let fixture: ComponentFixture<GestionarEgresosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarEgresosComponent]
    });
    fixture = TestBed.createComponent(GestionarEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
