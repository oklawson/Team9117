import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
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
  ) { }

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
