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

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private firebaseService: FirebaseService,
		public afAuth: AngularFireAuth
  ) {}

  doRegister(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  doLogin(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
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

  // delete below methods if safe
  //---------------------------------------------------------------

  // email and password authentication methods
  validateEmail(email: string): boolean {
    
    let isValid: boolean = true;
    // todo: actually fill this out

    if (isValid) {
      console.log(email + " is a valid email");
      return true;
    }
    return false;
  }

  validatePassword(password: string): boolean {
    
    let isValid: boolean = true;
    // todo: actually fill this out

    if (isValid) {
      console.log(password + " is a valid password");
      return true;
    }
    return false;
  }



  // fill with login, register, logout auth methods

  logout() {
    this.clearToken();
  }

  clearToken() {
    this.token = null;
    this.isLoggedIn=false;
  }

  setToken(value: string) {
    this.token = value;
    this.isLoggedIn=true;
  }

  getToken() {
  	return this.storage.getItem('token').then(
	data => {
		this.token = data;

		if (this.token != null) {
		this.isLoggedIn=true;
		} else {
		this.isLoggedIn=false;
		}
	},
	error => {
		this.token = null;
		this.isLoggedIn=false;
	}
	);
  }
}