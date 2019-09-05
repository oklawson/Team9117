import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WelcomeNewPage } from './welcome-new.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeNewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WelcomeNewPage]
})
export class WelcomeNewPageModule {}
