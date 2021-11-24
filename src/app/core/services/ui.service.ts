import { Injectable } from '@angular/core';
import { AlertButton, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async presentAlert(
    message: string,
    header?: string,
    subHeader?: string,
    button?: AlertButton
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK', button],
    });
    await alert.present();
  }

  async presentToast(message: string, duration: number, position) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });
    toast.present();
  }
}
