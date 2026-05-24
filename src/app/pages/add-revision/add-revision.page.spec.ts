import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddRevisionPage } from './add-revision.page';

describe('AddRevisionPage', () => {
  let component: AddRevisionPage;
  let fixture: ComponentFixture<AddRevisionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRevisionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
