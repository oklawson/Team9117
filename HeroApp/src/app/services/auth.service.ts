import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';


import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
// make user to fit REST authentication
//import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  lookupValue: any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private firebaseService: FirebaseService,
		public afAuth: AngularFireAuth
  ) {

  }

  waitFor(condition, callback) {
      if(!condition()) {
          console.log('waiting');
          window.setTimeout(waitFor.bind(null, condition, callback), 100); /* this checks the flag every 100 milliseconds*/
      } else {
          console.log('done');
          callback();
      }
  }

  doLookupExisting(value) {
    this.firebaseService.lookupExistingCardOwner(value.cardnumber);
    this.lookupValue = value;



    this.waitFor(this.firebaseService.getExistingCardData() != null, () => this.doLookupExistingPart2(this.firebaseService.getExistingCardData()));
    
  }

  doLookupExistingPart2(data) {
    console.log("made it");
    let value = this.lookupValue;

    if (data != null && value.email == data.email)
    {
      // construct their account info with database data
      value.firstname = data.firstname;
      value.lastname = data.lastname;
      value.email = data.email;
      // they just decided on their password
      // card number had to be right for lookup to pass
      return this.doRegister(value);
    }
    else
    {
      throw new Error("Couldn't find an account matching this card number");
    }
  
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => { resolve(res); },
        err => reject(err))
    }).then(
      () => {
        if (value.cardnumber) {
          this.firebaseService.writeUserData(firebase.auth().currentUser.uid, value.firstname, value.lastname, value.email, value.cardnumber);
        } else {
          this.firebaseService.writeUserData(firebase.auth().currentUser.uid, value.firstname, value.lastname, value.email, null);
        }
      }
    )
  }

  doLogin(value){

  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(res => {
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => { resolve(res); },
          err => reject(err))
      });
    });
  }

	doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(() => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        reject();
      });
    })
  }

  // email and password authentication methods
  validateEmail(email: string): boolean {
    
    let isValid: boolean = true;
    // todo: actually fill this out

    if (isValid) {
      //console.log(email + " is a valid email");
      return true;
    }
    return false;
  }

  validatePassword(password: string): boolean {
    
    let isValid: boolean = true;
    // todo: actually fill this out

    if (isValid) {
      //console.log(password + " is a valid password");
      return true;
    }
    return false;
  }

}