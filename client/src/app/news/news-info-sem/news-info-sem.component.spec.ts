import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsInfoSemComponent } from './news-info-sem.component';

describe('NewsInfoSemComponent', () => {
  let component: NewsInfoSemComponent;
  let fixture: ComponentFixture<NewsInfoSemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsInfoSemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsInfoSemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
