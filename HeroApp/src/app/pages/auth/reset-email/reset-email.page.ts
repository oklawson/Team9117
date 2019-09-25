import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Validators, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsernameValidator } from 'src/app/validators/username.validator';
import { PasswordValidator } from 'src/app/validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.page.html',
  styleUrls: ['./reset-email.page.scss'],
})
export class ResetEmailPage implements OnInit {

  pass: string;
  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {

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

}
