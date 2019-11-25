import { Component } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private qrCode: string;
  userLocation;
  zone;
  userCity;
  latLongResult;
  latitude;
  longitude;
  userLocationFromLatLng;

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    public geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private platform: Platform,
  )
  {
    this.getUserLocation();
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

    }
  
    getUserLocation() {
      this.geolocation.getCurrentPosition().then((resp) => {
        // this.getGeoLocation(resp.coords.latitude, resp.coords.longitude)
        // if (this.platform.is('cordova')) {
        //   let options: NativeGeocoderOptions = {
        //     useLocale: true,
        //     maxResults: 5
        //   };
        //   this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
        //     .then((result: any) => {
        //       console.log(result)
        //       this.userLocation = result[0]
        //       console.log(this.userLocation)
        //     })
        //     .catch((error: any) => console.log(error));
        // } else {
        //   this.getGeoLocation(resp.coords.latitude, resp.coords.longitude)
        // }
      }).catch((error) => {
      });
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        console.log("current latitude: " + data.coords.latitude)
        console.log("current longitude: " + data.coords.longitude)
        // data.coords.longitude
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        if (this.platform.is('cordova')) {
          let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
          };
          this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude, options)
            .then((result: NativeGeocoderResult[]) => {
              console.log(result)
              this.userLocation = result[0]
              console.log(this.userLocation)
            })
            .catch((error: any) => console.log(error));
        } else {
          console.log('not cordove')
          // this.getGeoLocation(data.coords.latitude, data.coords.longitude)
        }
      });
    }
    
    /* function to asynchronously monitor location
       CURRENTLY NOT WORKING */
    // async getGeoLocation(lat: number, lng: number, type?) {
    //   if (navigator.geolocation) {
    //     let geocoder = await new google.maps.Geocoder();
    //     let latlng = await new google.maps.LatLng(lat, lng);
    //     let request = { latLng: latlng };
  
    //     await geocoder.geocode(request, (results, status) => {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //         let result = results[0];
    //         this.zone.run(() => {
    //           if (result != null) {
    //             this.userCity = result.formatted_address;
    //             if (type === 'reverseGeocode') {
    //               this.latLongResult = result.formatted_address;
    //             }
    //           }
    //         })
    //       }
    //     });
    //   }
    // }

    /* function to convert latitude and longitude to an address
       CURRENTLY NOT WORKING */
    reverseGeocode(lat, lng) {
      if (this.platform.is('cordova')) {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(lat, lng, options)
          .then((result: NativeGeocoderResult[]) => this.userLocationFromLatLng = result[0])
          .catch((error: any) => console.log(error));
      } else {
        // this.getGeoLocation(lat, lng, 'reverseGeocode');
      }
    }
    
    /* function to take in an address and output coordinates 
       CURRENTLY NOT WORKING */
    forwardGeocode(address) {
      if (this.platform.is('cordova')) {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.forwardGeocode(address, options)
          .then((result: NativeGeocoderResult[]) => {
            this.zone.run(() => {
              this.latitude = result[0].latitude;
              this.longitude = result[0].longitude;
            })
          })
          .catch((error: any) => console.log(error));
      } else {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            this.zone.run(() => {
              this.latitude = results[0].geometry.location.lat();
              this.longitude = results[0].geometry.location.lng();
            })
          } else {
            alert('Error - ' + results + ' & Status - ' + status)
          }
        });
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
