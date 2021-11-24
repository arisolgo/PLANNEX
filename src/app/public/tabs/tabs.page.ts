import { Component, OnInit } from '@angular/core';
import {
  Response,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import { ScheduledServiceService } from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { TabsService } from './services/tabs.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { Geolocation } from '@capacitor/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PostService } from 'src/app/core/services/post.service';
import { UiService } from 'src/app/core/services/ui.service';
import { PutService } from 'src/app/core/services/put.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private scheduledServices: ScheduledServiceService,
    private tabService: TabsService,
    private authService: AuthService,
    private backgroundMode: BackgroundMode,
    private postService: PostService,
    private uiService: UiService,
    private putService: PutService,
    private alertCtrl: AlertController
  ) {}
  currentUser = this.authService.getCurrentUser();
  currentRole = 0;
  todayService: BehaviorSubject<ScheduledService> = new BehaviorSubject(null);
  devicePushToken = '';
  lateAdvise = false;
  ngOnInit() {
    this.setPushNotifications();
  }

  ionViewDidEnter() {
    this.getUserScheduledServices();
    let pushGeoLocOnBackground = this.todayService.pipe(
      switchMap(async (todayService) => {
        this.onBackgroundActive(todayService);
      })
    );
    pushGeoLocOnBackground.subscribe((response) => {
      console.log('BACKGROUND MODE ?', response);
    });
  }

  onBackgroundActive(todayService) {
    this.backgroundMode.on('activate').pipe(
      map(() => {
        this.startTrackPosition(todayService);
      })
    );
  }

  async startTrackPosition(todayService: ScheduledService) {
    const callBackId = await Geolocation.watchPosition(
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 5 },
      (event) => {
        console.log('evento', event);
        console.log(todayService);
        console.log(this.devicePushToken);

        this.postService
          .compareDistance(
            this.devicePushToken,
            todayService,
            event.coords.latitude,
            event.coords.longitude
          )
          .subscribe(async (response: Response) => {
            if (response.result) {
              this.stopTrackPosition(callBackId);
            }
            let dateData = new Date(todayService.scheduledEndDate);
            let now = new Date();
            if (
              dateData.getFullYear() === now.getFullYear() &&
              dateData.getMonth() === now.getMonth() &&
              dateData.getDay() === now.getDay() &&
              dateData.getHours() <= now.getHours()
            ) {
              await this.stopTrackPosition(callBackId);
            }
          });
      }
    );
  }

  async stopTrackPosition(callBackId) {
    await Geolocation.clearWatch({ id: callBackId }).then(() =>
      console.log('Watch paused, id: ', callBackId)
    );
  }

  setPushNotifications() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      this.devicePushToken = token.value;
      console.log(token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        //alert('Push received: ' + JSON.stringify(notification));
        if (!this.lateAdvise) {
          if (notification.body.includes('un poco alejado')) {
            this.lateAdvise = true;
            this.uiService.presentAlert(
              notification.body,
              'Retardado?',
              'Ya casi tienes que estar recibiendo tu servicio de hoy.',
              {
                text: 'Cancelar',
                handler: () => {
                  this.openCancelAlert();
                },
              }
            );
          }
        }
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  getUserScheduledServices() {
    this.tabService.resetUserEvents();
    this.currentUser.then((user) => {
      let userObj = JSON.parse(user.value);
      this.currentRole = userObj.Role;

      if (this.currentRole == 1) {
        this.scheduledServices
          .getApiScheduledServiceClientIdGetScheduledServicesByClientId(
            userObj.Id
          )
          .subscribe((response: Response) => {
            let hasServiceToday = false;
            let todayService: ScheduledService;
            response.result.forEach((element: ScheduledService) => {
              let servicesNames = '';
              let providerName = '';
              let counter = 0;
              element.scheduledProviderServices.forEach((element) => {
                servicesNames += ' ' + element.providerServiceName;
                if (counter > 0) {
                  servicesNames += ', ';
                }
                providerName = element.providerName;
                counter++;
              });

              let newEvent: ServiceEvent = {
                title: servicesNames,
                startTime: new Date(element.scheduledDate),
                endTime: new Date(element.scheduledEndDate),
                desc: 'Servicio a proveer por: ' + providerName,
                allDay: false,
                scheduledServiceId: element.id,
              };
              if (element.status == 1) {
                this.tabService.addUserEvent(newEvent);
                let dateData = new Date(element.scheduledDate);
                let now = new Date();

                if (
                  dateData.getFullYear() === now.getFullYear() &&
                  dateData.getMonth() === now.getMonth() &&
                  dateData.getDay() === now.getDay() &&
                  dateData.getHours() >= now.getHours()
                ) {
                  console.log(dateData.getHours(), dateData.getMinutes());
                  console.log(now.getHours(), now.getMinutes());
                  hasServiceToday = true;
                  todayService = element;
                  this.todayService.next(element);
                }
              }
            });
            if (hasServiceToday) {
              console.log('Me llame');
              this.startTrackPosition(todayService);
            }
          });
      } else if (this.currentRole == 2) {
        this.scheduledServices
          .getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
            userObj.Id
          )
          .subscribe((response: Response) => {
            response.result.forEach((element: ScheduledService) => {
              let servicesNames = '';
              let providerName = '';
              let counter = 0;
              element.scheduledProviderServices.forEach((element) => {
                servicesNames += element.providerServiceName + ' ';
                if (counter > 0) {
                  servicesNames += ', ';
                }
                providerName = element.providerName;
                counter++;
              });
              let newEvent: ServiceEvent = {
                title: servicesNames,
                startTime: new Date(element.scheduledDate),
                endTime: new Date(element.scheduledEndDate),
                desc: 'Servicio a proveer por: ' + providerName,
                allDay: false,
                scheduledServiceId: element.id,
              };
              if (element.status == 1) {
                this.tabService.addUserEvent(newEvent);
              }
            });
          });
      }
    });
  }

  cancelOrder(scheduledService) {
    scheduledService.status = 3;
    this.putService.updateScheduledService(scheduledService).subscribe(() => {
      this.uiService.presentToast('Orden Cancelada.', 1000, 'middle');
    });
  }

  async openCancelAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar Orden',
      message: 'Está seguro de que quiere cancelar esta orden de servicios?',
      buttons: [
        {
          text: 'SI',
          handler: () => {
            this.cancelOrder(this.todayService.value);
          },
        },
        'NO',
      ],
    });
    alert.present();
  }
}
