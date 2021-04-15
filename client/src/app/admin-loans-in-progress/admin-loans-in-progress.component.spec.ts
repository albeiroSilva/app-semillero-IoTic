import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoansInProgressComponent } from './admin-loans-in-progress.component';

describe('AdminLoansInProgressComponent', () => {
  let component: AdminLoansInProgressComponent;
  let fixture: ComponentFixture<AdminLoansInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoansInProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoansInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
