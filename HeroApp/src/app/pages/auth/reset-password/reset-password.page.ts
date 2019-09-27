import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NgForm } from '@angular/forms';

import { AlertService } from 'src/app/services/alert.service';
import { Validators, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsernameValidator } from 'src/app/validators/username.validator';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  genders: Array<string>;

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
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
      matching_passwords: this.matching_passwords_group
    });
  }

  validation_messages = {
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
  };

  doPasswordsMatch(p1: string, p2: string)
  {
    return p1 == p2;
  }
   
  resetPassword(form: NgForm)
  {
    // TODO: Make them reauthenticate before this

    if (this.doPasswordsMatch(form.value.matching_passwords.password, form.value.matching_passwords.confirm_password))
    {
      if (this.firebaseService.updateCurrentUserPassword(form.value.matching_passwords.password))
      {
        this.navCtrl.navigateRoot('/home').then(() => { this.alertService.presentToast("Password has been updated!"); });
      }
      else
      {
        this.alertService.presentToast("Something went wrong!");
      }
    }
  }

}
