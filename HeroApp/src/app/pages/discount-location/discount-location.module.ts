import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DiscountLocationPage } from './discount-location.page';

const routes: Routes = [
  {
    path: '',
    component: DiscountLocationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: DiscountLocationPage
      }
    ])
  ],
  declarations: [DiscountLocationPage]
})
export class DiscountLocationPageModule {}
