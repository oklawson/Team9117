import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

import { EnvService } from 'src/app/services/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
  public navCtrl: NavController,
	private authService: AuthService,
	private alertService: AlertService,

  private env: EnvService,
  private http: HttpClient
  ) { }

	ngOnInit() {
	}

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }

  goToHome(){
    this.navCtrl.navigateRoot('/home');
  }

  login(form : NgForm){

    this.authService.doLogin(form.value)
    .then(
      res => {
        console.log(form.value.email + " logged in successfully");
        this.goToHome();
      }, 
      err => {
        console.log(err);
        // TODO: maybe search for the email address and tell user whether or not that is correct
        this.alertService.presentToast("Username/Password combination does not exist");
      });
  }

}
