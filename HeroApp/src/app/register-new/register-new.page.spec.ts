import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewPage } from './register-new.page';

describe('RegisterNewPage', () => {
  let component: RegisterNewPage;
  let fixture: ComponentFixture<RegisterNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
