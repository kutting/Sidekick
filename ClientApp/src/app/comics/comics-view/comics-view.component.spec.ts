import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsViewComponent } from './comics-view.component';

describe('ComicsViewComponent', () => {
  let component: ComicsViewComponent;
  let fixture: ComponentFixture<ComicsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
