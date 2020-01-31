import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsSearchComponent } from './comics-search.component';

describe('ComicsSearchComponent', () => {
  let component: ComicsSearchComponent;
  let fixture: ComponentFixture<ComicsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
