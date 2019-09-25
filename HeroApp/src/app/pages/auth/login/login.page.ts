import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsernameValidator } from 'src/app/validators/username.validator';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

import { EnvService } from 'src/app/services/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pass: string;
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;
  genders: Array<string>;

  constructor(
    public navCtrl: NavController,
	private authService: AuthService,
	private alertService: AlertService,
  public formBuilder: FormBuilder,
  private router: Router,

  private env: EnvService,
  private http: HttpClient
  ) { }

	ngOnInit() {

    this.genders = [
      "Male",
      "Female"
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        UsernameValidator.validUsername,
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
    });

	}


  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
  };

  onSubmit(values){
    console.log(values);
    this.router.navigate(["/user"]);
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }

  goToHome(){
    this.navCtrl.navigateRoot('/home');
  }

  // login(form: NgForm) {
  // 	  // call authService.login
  //
  //     // for now just using sheetsu
  //
  //     this.alertService.presentToast("Verifying login...");
  //
  //
  //     let email: string = form.value.email;
  //     let pass: string = form.value.password;
  //     console.log(email + " " + pass);
  //
  //     this.http.request("GET", this.env.sheetsu_url + "/search?Username="+email+"&Password="+pass)
  //     .subscribe(
  //       success => {
  //         console.log("found user/pass");
  //         this.authService.setToken("dummy thicc");
  //         this.navCtrl.navigateRoot('/home');
  //       },
  //       fail => {
  //         console.log("nothing found");
  //         this.alertService.presentToast("Incorrect login!");
  //       }
  //     );
  // }

}
