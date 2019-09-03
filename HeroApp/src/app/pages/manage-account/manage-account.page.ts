import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.page.html',
  styleUrls: ['./manage-account.page.scss'],
})
export class ManageAccountPage {

  constructor(public navCtrl: NavController) {}

    goToLogin() {
       this.navCtrl.navigateRoot('/login');
    }

    goToPaymentInfo() {
      this.navCtrl.navigateForward('/payment-info')
    }

}
