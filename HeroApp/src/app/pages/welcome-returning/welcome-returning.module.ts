import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WelcomeReturningPage } from './welcome-returning.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeReturningPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeReturningPage]
})
export class WelcomeReturningPageModule {}
