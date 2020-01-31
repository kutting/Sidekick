import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsAddComponent } from './comics-add.component';

describe('ComicsAddComponent', () => {
  let component: ComicsAddComponent;
  let fixture: ComponentFixture<ComicsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
