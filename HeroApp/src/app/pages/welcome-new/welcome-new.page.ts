import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-new',
  templateUrl: './welcome-new.page.html',
  styleUrls: ['./welcome-new.page.scss'],
})
export class WelcomeNewPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToHome(){
    this.navCtrl.navigateRoot('/home');
  }

}
