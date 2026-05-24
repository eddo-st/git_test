import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAlertPage } from './add-alert.page';

describe('AddAlertPage', () => {
  let component: AddAlertPage;
  let fixture: ComponentFixture<AddAlertPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAlertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
