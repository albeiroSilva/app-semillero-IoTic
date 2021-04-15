import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMissionComponent } from './admin-mission.component';

describe('AdminMissionComponent', () => {
  let component: AdminMissionComponent;
  let fixture: ComponentFixture<AdminMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
