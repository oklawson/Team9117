import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeNewPage } from './welcome-new.page';

describe('WelcomeNewPage', () => {
  let component: WelcomeNewPage;
  let fixture: ComponentFixture<WelcomeNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
