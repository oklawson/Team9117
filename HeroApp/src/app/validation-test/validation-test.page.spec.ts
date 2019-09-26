import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationTestPage } from './validation-test.page';

describe('ValidationTestPage', () => {
  let component: ValidationTestPage;
  let fixture: ComponentFixture<ValidationTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
