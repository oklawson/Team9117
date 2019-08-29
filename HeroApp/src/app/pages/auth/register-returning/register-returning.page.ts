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

  register(form: NgForm) {
  	  // call authService.register with extra authentication
	  // to link with their hero account
  }

}
