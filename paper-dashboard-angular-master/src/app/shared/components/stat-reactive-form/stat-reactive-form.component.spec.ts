import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatReactiveFormComponent } from './stat-reactive-form.component';

describe('StatReactiveFormComponent', () => {
  let component: StatReactiveFormComponent;
  let fixture: ComponentFixture<StatReactiveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatReactiveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatReactiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
