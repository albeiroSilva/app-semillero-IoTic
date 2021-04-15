import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreNewsComponent } from './more-news.component';

describe('MoreNewsComponent', () => {
  let component: MoreNewsComponent;
  let fixture: ComponentFixture<MoreNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
