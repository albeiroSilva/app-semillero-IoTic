import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSemilleroMsgComponent } from './admin-semillero-msg.component';

describe('AdminSemilleroMsgComponent', () => {
  let component: AdminSemilleroMsgComponent;
  let fixture: ComponentFixture<AdminSemilleroMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSemilleroMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSemilleroMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
