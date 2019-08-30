import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    public navCtrl: NavController,
	private authService: AuthService,
	private alertService: AlertService
  ) { }

	ngOnInit() {
	}

  goToRegister(){
    this.navCtrl.navigateRoot('/register');
  }

  goToHome(){
    this.navCtrl.navigateRoot('/home');
  }

  login(form: NgForm) {
  	  // call authService.login
  }

}
