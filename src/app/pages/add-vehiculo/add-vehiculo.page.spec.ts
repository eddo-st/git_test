import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVehiculoPage } from './add-vehiculo.page';

describe('AddVehiculoPage', () => {
  let component: AddVehiculoPage;
  let fixture: ComponentFixture<AddVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
