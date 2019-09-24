import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register-returning',
  templateUrl: './register-returning.page.html',
  styleUrls: ['./register-returning.page.scss'],
})
export class RegisterReturningPage implements OnInit {

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
        //this.alertService.presentToast("valid email!", 500);
      } else {
        // bad visual here
        //this.alertService.presentToast("invalid email!", 500);
      }
    }
  }

  registerReturning(form: NgForm) {
  	  // call authService.register with extra authentication
	  // to link with their hero account


    this.authService.doRegister(form.value)
      .then(
      res => {
        this.goToWelcomeReturning();
      }, 
      err => {
        console.log(err);
      });
  }

  goToWelcomeReturning(){
    this.navCtrl.navigateRoot('/welcome-returning');
  }

}
