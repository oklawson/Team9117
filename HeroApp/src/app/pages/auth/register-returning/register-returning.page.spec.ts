import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReturningPage } from './register-returning.page';

describe('RegisterReturningPage', () => {
  let component: RegisterReturningPage;
  let fixture: ComponentFixture<RegisterReturningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterReturningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReturningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
