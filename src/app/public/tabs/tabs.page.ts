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

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private scheduledServices: ScheduledServiceService,
    private tabService: TabsService,
    private authService: AuthService
  ) {}
  currentUser = this.authService.getCurrentUser();
  currentRole = 0;

  ngOnInit() {
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
      alert('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
    this.getUserScheduledServices();
    console.log('Ree');
  }
  ionViewDidEnter() {
    this.getUserScheduledServices();
    console.log('Ree');
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
              if (element.status < 2) {
                this.tabService.addUserEvent(newEvent);
              }
            });
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
              if (element.status < 2) {
                this.tabService.addUserEvent(newEvent);
              }
            });
          });
      }
    });
  }
}
