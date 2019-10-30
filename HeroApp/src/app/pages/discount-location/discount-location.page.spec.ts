import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountLocationPage } from './discount-location.page';

describe('DiscountLocationPage', () => {
  let component: DiscountLocationPage;
  let fixture: ComponentFixture<DiscountLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
