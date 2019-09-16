import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.page.html',
  styleUrls: ['./manage-account.page.scss'],
})
export class ManageAccountPage {

  constructor(
    public navCtrl: NavController,
  private authService: AuthService
  ) {}

    logout() {
      this.authService.logout();
      this.goToLogin();
    }

    goToLogin() {
       this.navCtrl.navigateRoot('/login');
    }

    goToPaymentInfo() {
      this.navCtrl.navigateForward('/payment-info')
    }

    goToResetEmail() {
      this.navCtrl.navigateForward('/reset-email')
    }

    goToResetPassword() {
      this.navCtrl.navigateForward('/reset-password')
    }

}
