import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  toastInstance;

  constructor(private toastController: ToastController) { }

  async presentToast(message: any) {

    if (this.toastInstance == null) {
      let toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'top',
        color: 'dark'
      });
      toast.present();
      this.toastInstance = toast;
    }
  }

  async presentToast(message: any, d: number) {

    //if (this.toastInstance == null) {
    this.toastController.dismiss();
      let toast = await this.toastController.create({
        message: message,
        duration: d,
        position: 'top',
        color: 'dark'
      });
      toast.present();
      this.toastInstance = toast;
    //}
    console.log(this.toastController);
  }
}
