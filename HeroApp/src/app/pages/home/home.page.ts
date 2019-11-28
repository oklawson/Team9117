import { Component, NgZone } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { initializeApp } from 'firebase';
import { GoogleMaps,
         GoogleMap,
         GoogleMapsEvent,
         LatLng,
         MarkerOptions,
         Marker } from '@ionic-native/google-maps';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private qrCode: string;
  //zone;
  userCity;
  latLongResult;
  UserLat;
  UserLong;
  UserLocation;
  userLocationFromLatLng;

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    public geolocation: Geolocation,
    private geocoder: NativeGeocoder,
    private platform: Platform,
    public googleMaps: GoogleMaps,
    public zone: NgZone
  )
  {
    //this.getUserLocation();
    this.firebaseService.getCurrentUser().subscribe(
    (data) => {
      console.log(data);
      console.log(data.data());
      let firstName = data.data().firstName;
      let lastName = data.data().lastName;
      let email = data.data().email;

      let formatted = firstName + " " + lastName + ", " + email;
      console.log(formatted);
      this.qrCode = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + formatted;
    });
    platform.ready().then(() => {
      this.getUserLocation();
    })
    // this.getUserLocation();
  }

    getUserLocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log("inside getUserLocation");
        if (this.platform.is('cordova')) {
          console.log("cordova inside getUserLocation");
          let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
          };
          this.geocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options).then((result: any) => {
            console.log("within reverse geocode call: " + result);
            this.UserLocation = result[0];
            this.UserLat = resp.coords.latitude;
            this.UserLong = resp.coords.longitude;
            console.log("user's latitude: " + this.UserLat);
            console.log("user's longitude: " + this.UserLong);  
            console.log("user's location within reverse geocoding: " + this.UserLocation);
            })
            .catch((error: any) => console.log("geocoding error: " + error));
        } else {
          // ELSE STATEMENT THAT HAS CAUSED ERRORS- FIX LATER
          this.getGeoLocation(this.UserLat, this.UserLong);
        }
      });
      // watch.subscribe((data) => {
      //   // data can be a set of coordinates, or an error (if an error occurred).
      //   this.UserLat = data.coords.latitude;
      //   this.UserLong = data.coords.longitude;
      //   console.log("user's latitude: " + this.UserLat);
      //   console.log("user's longitude: " + this.UserLong);
      // });
      let watch = this.geolocation.watchPosition();
    }

  async getGeoLocation(lat: number, long: number, type?) {
    console.log("inside of getGeoLocation");
    if (navigator.geolocation) {
      console.log("inside navigator.geolocation if statement");
      let geocoder = await new google.maps.Geocoder();
      var latlong = await new google.maps.LatLng(lat, long);
      var request = { latLong: latlong };

      await geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log("google maps geocoder status: OK");
        }
      })
    }
  }

  goToLogin() {
     this.navCtrl.navigateRoot('/login');
  }

  goToPaymentInfo() {
    this.navCtrl.navigateForward('/payment-info')
  }

  // goToRewards() {
  //   this.navCtrl.navigateForward('/rewards')
  // }

  goToBrowse() {
    this.navCtrl.navigateForward('/browse')
  }

  goToManageAccount() {
    this.navCtrl.navigateForward('/manage-account')
  }

}
