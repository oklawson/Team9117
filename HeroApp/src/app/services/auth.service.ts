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

  // fill with login, register, logout auth methods

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
