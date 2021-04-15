import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoansFinishedComponent } from './admin-loans-finished.component';

describe('AdminLoansFinishedComponent', () => {
  let component: AdminLoansFinishedComponent;
  let fixture: ComponentFixture<AdminLoansFinishedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLoansFinishedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoansFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
