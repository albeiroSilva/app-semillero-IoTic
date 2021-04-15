import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSemilleroCoursesComponent } from './admin-semillero-courses.component';

describe('AdminSemilleroCoursesComponent', () => {
  let component: AdminSemilleroCoursesComponent;
  let fixture: ComponentFixture<AdminSemilleroCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSemilleroCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSemilleroCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
