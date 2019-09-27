import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { NgForm } from '@angular/forms';

import { AlertService } from 'src/app/services/alert.service';
import { Validators, FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsernameValidator } from 'src/app/validators/username.validator';
import { PasswordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.page.html',
  styleUrls: ['./reset-email.page.scss'],
})
export class ResetEmailPage implements OnInit {


  pass: string;
  validations_form: FormGroup;

  constructor(
    public navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  updateEmail(form: NgForm) {
    if (this.firebaseService.updateCurrentUserEmail(form.value.email))
    {
      this.navCtrl.navigateRoot('/home').then(() => { this.alertService.presentToast("Email Updated Successfully!"); });
    }
    else
    {
      this.alertService.presentToast("Something went wrong!");
    }
  }

}
