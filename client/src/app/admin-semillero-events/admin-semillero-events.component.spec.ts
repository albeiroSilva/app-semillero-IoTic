import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSemilleroEventsComponent } from './admin-semillero-events.component';

describe('AdminSemilleroEventsComponent', () => {
  let component: AdminSemilleroEventsComponent;
  let fixture: ComponentFixture<AdminSemilleroEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSemilleroEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSemilleroEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
