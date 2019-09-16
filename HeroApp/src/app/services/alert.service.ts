import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  toastInstance;

  constructor(private toastController: ToastController) { }


  async presentToast(...args: any[]) {
    let message: any = args[0];
    let d: number = 3000;
    if (args[1])
    {
      d = args[1];
    }

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
