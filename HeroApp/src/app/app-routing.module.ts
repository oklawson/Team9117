import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  // setting canActivate will block this page from being accessed when no token is stored
  { path: 'payment-info', loadChildren: './pages/payment-info/payment-info.module#PaymentInfoPageModule'},//, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'register-new', loadChildren: './pages/auth/register-new/register-new.module#RegisterNewPageModule' },
  { path: 'register-returning', loadChildren: './pages/auth/register-returning/register-returning.module#RegisterReturningPageModule' },  { path: 'rewards', loadChildren: './rewards/rewards.module#RewardsPageModule' },
  { path: 'discounts', loadChildren: './pages/discounts/discounts.module#DiscountsPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
