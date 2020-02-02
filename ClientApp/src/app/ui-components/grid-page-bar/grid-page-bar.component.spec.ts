import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPageBarComponent } from './grid-page-bar.component';

describe('GridPageBarComponent', () => {
  let component: GridPageBarComponent;
  let fixture: ComponentFixture<GridPageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
