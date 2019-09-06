import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToRegisterNew(){
    this.navCtrl.navigateForward('/register-new');
  }

  goToRegisterReturning(){
    this.navCtrl.navigateForward('/register-returning');
  }

}
