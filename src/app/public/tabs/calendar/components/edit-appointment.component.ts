import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import {
  Response,
  ScheduledProviderService,
  ScheduledService,
} from 'src/app/core/models/models';
import { ScheduledServiceService } from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { PutService } from 'src/app/core/services/put.service';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss'],
})
export class EditAppointmentComponent implements OnInit {
  constructor(
    private modalController: ModalController,
    private uiService: UiService,
    private alertCtrl: AlertController,
    private scheduledServiceServ: ScheduledServiceService,
    private putService: PutService,
    private router: Router,
    private authService: AuthService
  ) {}
  appointmentDetail;
  scheduledService: ScheduledService;
  getCurrentUser = this.authService.getCurrentUser();
  userRole = 0;

  ngOnInit(): void {
    this.getCurrentUser.then((user) => {
      this.userRole = JSON.parse(user.value).Role;
    });
    this.getServices();
  }

  getServices() {
    this.scheduledServiceServ
      .getApiScheduledServiceScheduledServiceIdGetScheduledServiceById(
        this.appointmentDetail.scheduledProviderServiceId
      )
      .subscribe((response: Response) => {
        let scheduledService: ScheduledService = response.result;
        console.log(scheduledService);
        this.scheduledService = scheduledService;
      });
  }

  completeOrder() {
    if (this.scheduledService.scheduledDate.getTime() > new Date().getTime()) {
      this.uiService.presentAlert(
        'Para completar una orden debe esperar a la fecha y hora de agendado.',
        'Aún no puedes completar este servicio',
        'Fecha inválida'
      );
      return false;
    }
    this.scheduledService.status = 2;

    this.putService
      .updateScheduledService(this.scheduledService)
      .subscribe(() => {
        this.uiService.presentToast(
          'Orden Completada Satisfactoriamente!.',
          1000,
          'middle'
        );
        this.close(true);
      });
  }

  cancelOrder() {
    this.scheduledService.status = 3;
    this.putService
      .updateScheduledService(this.scheduledService)
      .subscribe(() => {
        this.uiService.presentToast('Orden Cancelada.', 1000, 'middle');
        this.close(true);
      });
  }

  async openCancelAlert() {
    let message =
      this.userRole == 2
        ? 'Está seguro de que quiere cancelar esta orden de servicios? Esto puede afectar a su puntuación como proveedor de servicios.'
        : 'Está seguro de que quiere cancelar esta orden de servicios?';

    const alert = await this.alertCtrl.create({
      header: 'Cancelar Orden',
      message: message,
      buttons: [
        {
          text: 'SI',
          handler: () => {
            this.cancelOrder();
          },
        },
        'NO',
      ],
    });
    alert.present();
  }

  async openComplete() {
    const alert = await this.alertCtrl.create({
      header: 'Completar Orden',
      message: 'Está seguro de que quiere completar esta orden de servicios? ',
      buttons: [
        {
          text: 'SI',
          handler: () => {
            this.completeOrder();
          },
        },
        'NO',
      ],
    });
    alert.present();
  }

  close(update?) {
    this.modalController.dismiss(update);
  }
}
