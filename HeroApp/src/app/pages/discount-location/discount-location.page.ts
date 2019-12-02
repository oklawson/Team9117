import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Nav } from 'src/app/services/nav.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform, NavController } from '@ionic/angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, MarkerOptions, Marker, Environment } from '@ionic-native/google-maps';
import { database } from 'firebase';

declare var google;

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
  Latitude: string | null;
  Longitude: string | null;
  DistanceFromUser: string | null;

  constructor(public nav: Nav, 
              private geolocation: Geolocation, 
              private geocoder: NativeGeocoder, 
              private platform: Platform,
              public googleMaps: GoogleMaps, 
              public navController: NavController, 
              public elem: ElementRef, 
              public zone: NgZone) { 

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
    this.Latitude = data.Latitude;
    //console.log("latitude: " + this.Latitude);
    this.Longitude = data.Longitude;
    //console.log("longitude: " + this.Longitude);

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.UserLat = data.coords.latitude;
      this.UserLong = data.coords.longitude;
      this.DistanceFromUser =  this.distanceFromUser().toFixed(2) + ' miles';
      //console.log("distance from user: " + this.DistanceFromUser);
      // console.log("user's latitude: " + this.UserLat);
      // console.log("user's longitude: " + this.UserLong);
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
    if(!this.Latitude.includes("null")) {

      var origin = new LatLng(this.UserLat, this.UserLong);
      var latString = +this.Latitude;
      var longString = + this.Longitude;
      var dest = new LatLng(latString, longString);

      this.map = GoogleMaps.create(this.element.nativeElement);
      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
        console.log("lat string: " + latString);
        console.log("long string: " + longString);
        let coordinates: LatLng = new LatLng(latString, longString);
        let position = {
          target: coordinates,
          zoom: 15
        };

        this.map.animateCamera(position);
        let markerOptions: MarkerOptions = {
          position: coordinates,
          title: this.Title
        };

        const marker = this.map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow();
        });
      })
    } else {
      console.log("This location has no listed address.");
    }
  }

  findRadius(x) {
    return x * Math.PI / 180;
  }

  distanceFromUser() {
    var R = 6378137; // mean radius of the earth
    var latNumber = +this.Latitude;
    var longNumber = +this.Longitude;
    var latDifference = this.findRadius(this.UserLat - latNumber);
    var longDifference = this.findRadius(this.UserLong - longNumber);
    var a = Math.sin(latDifference / 2) * Math.sin(latDifference / 2) +
            Math.cos(this.findRadius(this.UserLat)) * Math.cos(this.findRadius(latNumber)) *
            Math.sin(longDifference / 2) * Math.sin(longDifference / 2);
    var b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * b;
    var miles = d / 1609.344;
    return miles;
   }

  ngOnInit() {
  }

}
