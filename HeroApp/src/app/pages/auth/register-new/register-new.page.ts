import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.page.html',
  styleUrls: ['./register-new.page.scss'],
})
export class RegisterNewPage implements OnInit {

  pass: string;

  constructor(
    public navCtrl: NavController,
	private authService: AuthService,
	private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  checkEmail(email: string) {
    if (email) { // this stops weird stuff from happening when email is empty
      if (this.authService.validateEmail(email)) {
        // add good visual here
        this.alertService.presentToast("valid email!", 500);
      } else {
        // bad visual here
        this.alertService.presentToast("invalid email!", 500);
      }
    }
  }

  checkPassword(password: string) {
    // store the password to check against the confirm field
    this.pass = password;

    if (password) { // this stops weird stuff from happening when email is empty
      if (this.authService.validatePassword(password)) {
        // add good visual here
        this.alertService.presentToast("valid password!", 500);
      } else {
        // bad visual here
        this.alertService.presentToast("invalid password!", 500);
      }
    }
  }

  confirmPassword(confirm: string) {

    if (this.pass && confirm) {
      if (this.pass == confirm) {
        // add good visual here
        this.alertService.presentToast("passwords match!  Yay!", 500);
      } else {
        // add bad visual here
        this.alertService.presentToast("oh no!  passwords don't match!!!!", 500);
      }
    }
  }

  registerNew(form: NgForm) {
  	  // call authService.register




      if (true) {
        this.goToWelcomeNew();
      }
  }

  goToWelcomeNew() {
    this.navCtrl.navigateRoot('/welcome-new');
  }

}
