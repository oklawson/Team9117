import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.page.html',
  styleUrls: ['./reset-email.page.scss'],
})
export class ResetEmailPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertService: AlertService,

  ) { }

  ngOnInit() {
  }

  updateEmail(form: NgForm) {
    if (this.firebaseService.updateCurrentUserEmail(form.value.email))
    {
      this.navCtrl.navigateRoot('/home').then(() => { this.alertService.presentToast("Email Updated Successfully!"); });
    }
    else
    {
      this.alertService.presentToast("Something went wrong!");
    }
  }

}
