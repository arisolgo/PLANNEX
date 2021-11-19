import { Component, OnInit } from '@angular/core';
import {
  Response,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import { ScheduledServiceService } from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { TabsService } from './services/tabs.service';

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
