import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { Nav } from 'src/app/services/nav.service';
import { google } from 'google-maps';
import { GoogleMaps } from '@ionic-native/google-maps';

import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm.service';

import { Geofence } from '@ionic-native/geofence/ngx';

import { FCM } from '@ionic-native/fcm/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyD4DDqXdfTdThfFd-7QH1T1kGI3byoWyYw",
  authDomain: "testheroapp-f893e.firebaseapp.com",
  databaseURL: "https://testheroapp-f893e.firebaseio.com",
  projectId: "testheroapp-f893e",
  storageBucket: "testheroapp-f893e.appspot.com",
  messagingSenderId: "772903185008",
  appId: "1:772903185008:web:d5a454ea07bd68994e62b5"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app
    AngularFirestoreModule, // imports firebase/firestore
    AngularFireAuthModule, // imports firebase/auth
    AngularFireStorageModule, // imports firebase/storage

    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	  NativeStorage,
    Nav,
    Geolocation,
    NativeGeocoder,
    GoogleMaps,
    Firebase,
    FcmService,
    FCM,
    Geofence
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
