import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { FcmService } from './services/fcm.service';
import { ToastController } from '@ionic/angular';
import { Geofence } from '@ionic-native/geofence/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  	private authService: AuthService,
  	private navCtrl: NavController,
  	private alertService: AlertService,
    private fcm: FcmService,
    public toastController: ToastController,
    private geofence: Geofence
  ) {
    geofence.initialize().then(
        // resolved promise does not return a value
        () => console.log('Geofence Plugin Ready'),
        (err) => console.log(err)
      );
    this.initializeApp();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  // private notificationSetup() {
  //   this.fcm.getToken();
  //   this.fcm.onNotifications().subscribe(
  //     (msg) => {
  //       if (this.platform.is('ios')) {
  //         this.presentToast(msg.aps.alert);
  //       } else {
  //         this.presentToast(msg.body);
  //       }
  //     });
  // }

  private addGeofence() {
  //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude:       37.285951, //center of geofence radius
      longitude:      -121.936650,
      radius:         100, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           'You just arrived to Gliwice city center.', //notification body
          openAppOnClick: true //open app when notification is tapped
      }
    }

    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
 }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.notificationSetup();

      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window["plugins"].OneSignal
        .startInit("ed9b2d39-8cec-4438-a0cf-14762e390516", "AAAAs_SeqnA:APA91bEUpvAivIcopiY-RpAeLkWb5GbKHE5gzrBy_QKXUyDMEESG9xNcIKYmrQsQnYY92JKNeKSmIQHfI-tigv1MslpuL2b744CzYrCmDiyldCpHitc2C79WY5gSpkvoln7NJtEI29Qu")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    });
  }

}
