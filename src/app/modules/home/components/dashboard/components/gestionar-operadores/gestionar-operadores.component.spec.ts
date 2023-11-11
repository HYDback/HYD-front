import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarOperadoresComponent } from './gestionar-operadores.component';

describe('GestionarOperadoresComponent', () => {
  let component: GestionarOperadoresComponent;
  let fixture: ComponentFixture<GestionarOperadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarOperadoresComponent]
    });
    fixture = TestBed.createComponent(GestionarOperadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
