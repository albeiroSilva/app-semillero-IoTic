import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembersPendingComponent } from './admin-members-pending.component';

describe('AdminMembersPendingComponent', () => {
  let component: AdminMembersPendingComponent;
  let fixture: ComponentFixture<AdminMembersPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMembersPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMembersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
