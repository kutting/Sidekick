import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsEditComponent } from './comics-edit.component';

describe('ComicsEditComponent', () => {
  let component: ComicsEditComponent;
  let fixture: ComponentFixture<ComicsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
