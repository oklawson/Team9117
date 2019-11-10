import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  // setting canActivate will block this page from being accessed when no token is stored
  { path: 'payment-info', loadChildren: './pages/payment-info/payment-info.module#PaymentInfoPageModule'},//, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'register-new', loadChildren: './pages/auth/register-new/register-new.module#RegisterNewPageModule' },
  { path: 'register-returning', loadChildren: './pages/auth/register-returning/register-returning.module#RegisterReturningPageModule' },
  { path: 'rewards', loadChildren: './rewards/rewards.module#RewardsPageModule' },
  { path: 'discounts', loadChildren: './pages/discounts/discounts.module#DiscountsPageModule' },
  { path: 'manage-account', loadChildren: './pages/manage-account/manage-account.module#ManageAccountPageModule' },
  { path: 'welcome-returning', loadChildren: './pages/welcome-returning/welcome-returning.module#WelcomeReturningPageModule' },
  { path: 'welcome-new', loadChildren: './pages/welcome-new/welcome-new.module#WelcomeNewPageModule' },
  { path: 'reset-password', loadChildren: './pages/auth/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'reset-email', loadChildren: './pages/auth/reset-email/reset-email.module#ResetEmailPageModule' },
  { path: 'validation-test', loadChildren: './validation-test/validation-test.module#ValidationTestPageModule' },
  { path: 'browse', loadChildren: './pages/browse/browse.module#BrowsePageModule' },
  { path: 'discount-location', loadChildren: './pages/discount-location/discount-location.module#DiscountLocationPageModule' },  { path: 'upload', loadChildren: './pages/upload/upload.module#UploadPageModule' },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
