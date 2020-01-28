import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTitlebarComponent } from './grid-titlebar.component';

describe('GridTitlebarComponent', () => {
  let component: GridTitlebarComponent;
  let fixture: ComponentFixture<GridTitlebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridTitlebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
