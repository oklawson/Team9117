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

  login(form: NgForm) {
  	  // call authService.login

      // for now just using sheetsu

      this.alertService.presentToast("Verifying login...");


      let email: string = form.value.email;
      let pass: string = form.value.password;
      console.log(email + " " + pass);

      this.http.request("GET", this.env.sheetsu_url + "/search?Username="+email+"&Password="+pass)
      .subscribe(
        success => {
          console.log("found user/pass");
          this.authService.setToken("dummy thicc");
          this.navCtrl.navigateRoot('/home');
        },
        fail => {
          console.log("nothing found");
          this.alertService.presentToast("Incorrect login!");
        }
      );
  }

}
