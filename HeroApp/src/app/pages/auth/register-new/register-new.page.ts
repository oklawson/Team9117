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

  constructor(
    public navCtrl: NavController,
	private authService: AuthService,
	private alertService: AlertService
  ) { }

  ngOnInit() {
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
