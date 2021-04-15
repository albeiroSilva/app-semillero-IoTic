import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsComponent } from './admin-us.component';

describe('AdminUsComponent', () => {
  let component: AdminUsComponent;
  let fixture: ComponentFixture<AdminUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
