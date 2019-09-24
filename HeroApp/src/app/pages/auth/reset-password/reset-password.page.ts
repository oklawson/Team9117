import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
  }

  doPasswordsMatch(p1: string, p2: string)
  {
    return p1 == p2;
  }

  resetPassword(form: NgForm)
  {
    if (this.doPasswordsMatch(form.value.new, form.value.confirm))
    {
      if (this.firebaseService.updateCurrentUserPassword(form.value.new))
      {
        this.navCtrl.navigateRoot('/home').then(() => { this.alertService.presentToast("Password has been updated!"); });
      }
      else
      {
        this.alertService.presentToast("Something went wrong!");
      }
    }
  }

}
