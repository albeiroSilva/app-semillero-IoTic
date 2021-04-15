import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResourcesCategoriesComponent } from './admin-resources-categories.component';

describe('AdminSemilleroCategoriesComponent', () => {
  let component: AdminResourcesCategoriesComponent;
  let fixture: ComponentFixture<AdminResourcesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminResourcesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResourcesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
