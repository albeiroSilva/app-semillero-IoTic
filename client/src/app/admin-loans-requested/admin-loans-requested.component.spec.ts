import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoansRequestedComponent } from './admin-loans-requested.component';

describe('AdminLoansRequestedComponent', () => {
  let component: AdminLoansRequestedComponent;
  let fixture: ComponentFixture<AdminLoansRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoansRequestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoansRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
