import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSemilleroNewsComponent } from './admin-semillero-news.component';

describe('AdminSemilleroNewsComponent', () => {
  let component: AdminSemilleroNewsComponent;
  let fixture: ComponentFixture<AdminSemilleroNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSemilleroNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSemilleroNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
