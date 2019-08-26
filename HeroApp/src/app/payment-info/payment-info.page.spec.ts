import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoPage } from './payment-info.page';

describe('PaymentInfoPage', () => {
  let component: PaymentInfoPage;
  let fixture: ComponentFixture<PaymentInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
