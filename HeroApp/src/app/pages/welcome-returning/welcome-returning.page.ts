import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-returning',
  templateUrl: './welcome-returning.page.html',
  styleUrls: ['./welcome-returning.page.scss'],
})
export class WelcomeReturningPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToHome(){
    this.navCtrl.navigateRoot('/home');
  }

}
