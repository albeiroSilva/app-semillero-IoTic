import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVisionComponent } from './admin-vision.component';

describe('AdminVisionComponent', () => {
  let component: AdminVisionComponent;
  let fixture: ComponentFixture<AdminVisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
