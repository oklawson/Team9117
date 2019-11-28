import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Nav } from 'src/app/services/nav.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform, NavController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Environment } from '@ionic-native/google-maps';

@Component({
  selector: 'app-discount-location',
  templateUrl: './discount-location.page.html',
  styleUrls: ['./discount-location.page.scss'],
})
export class DiscountLocationPage {

  @ViewChild('map', {static:false})element: ElementRef;
  map: GoogleMap;

  Image: string | null;
  Title: string | null;
  Location: string | null;
  Discount: string | null;
  Limitations: string | null;
  UnlimitedUsage: string | null;
  LocationType: string | null;
  UserLat: number | null;
  UserLong: number | null;
  UserLocation: string | null;

  constructor(public nav: Nav, private geolocation: Geolocation, private geocoder: NativeGeocoder, private platform: Platform,
    public googleMaps: GoogleMaps, public navController: NavController, public elem: ElementRef) { 
    console.log("on discount page");
    console.log(nav.get('data'));
    let data = nav.get('data');

    this.elem.nativeElement;
    this.Image = data.Image;
    this.Title = data.Title;
    this.Location = data.Location;
    this.Discount = data.Discount;
    this.Limitations = data.Limitations;
    this.UnlimitedUsage = data.UnlimitedUsage;
    this.LocationType = data.LocationType;

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.UserLat = data.coords.latitude;
      this.UserLong = data.coords.longitude;
      console.log("user's latitude: " + this.UserLat);
      console.log("user's longitude: " + this.UserLong);
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      Environment.setEnv({
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCwsfN6crCKEaFFPHANHiwPS-WuvoOt0Fk',
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCwsfN6crCKEaFFPHANHiwPS-WuvoOt0Fk'
      });
      this.initMap();
    });
  }

  initMap() {
    //console.log(el);
    console.log("inside initMap function");
    this.map = GoogleMaps.create(this.element.nativeElement);
    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      let coordinates: LatLng = new LatLng(33.7756, -84.3963);
      let position = {
        target: coordinates,
        zoom: 17
      };

      this.map.animateCamera(position);
      let markerOptions: MarkerOptions = {
        position: coordinates,
        // icon: "assets/images/icons8-Marker-64.png",
        title: 'Testing Maps'
      };

      const marker = this.map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    })
  }

  displayGoogleMap () {

  }

  ngOnInit() {
  }

}
