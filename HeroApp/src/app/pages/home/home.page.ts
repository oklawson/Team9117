import { Component } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private qrCode: string;

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
  )
  {
    this.firebaseService.getCurrentUser().subscribe(
    (data) => {
      console.log(data);
      console.log(data.data());
      let firstName = data.data().firstName;
      let lastName = data.data().lastName;
      let email = data.data().email;

      let formatted = firstName + " " + lastName + ", " + email;
      console.log(formatted);



      this.qrCode = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + formatted;
    });
  }

  goToLogin() {
     this.navCtrl.navigateRoot('/login');
  }

  goToPaymentInfo() {
    this.navCtrl.navigateForward('/payment-info')
  }

  // goToRewards() {
  //   this.navCtrl.navigateForward('/rewards')
  // }

  goToBrowse() {
    this.navCtrl.navigateForward('/browse')
  }

  goToManageAccount() {
    this.navCtrl.navigateForward('/manage-account')
  }

}
