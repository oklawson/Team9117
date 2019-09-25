import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { PasswordValidator } from '../validators/password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-test',
  templateUrl: './validation-test.page.html',
  styleUrls: ['./validation-test.page.scss'],
})
export class ValidationTestPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  // country_phone_group: FormGroup;

  genders: Array<string>;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router
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
      gender: new FormControl(this.genders[0], Validators.required),
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
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    // 'phone': [
    //   { type: 'required', message: 'Phone is required.' },
    //   { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    // ],
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
