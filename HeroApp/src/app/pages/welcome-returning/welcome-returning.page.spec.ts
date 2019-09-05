import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeReturningPage } from './welcome-returning.page';

describe('WelcomeReturningPage', () => {
  let component: WelcomeReturningPage;
  let fixture: ComponentFixture<WelcomeReturningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeReturningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeReturningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
