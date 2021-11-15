import { STRING_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, ReplaySubject, zip } from 'rxjs';
import { map, skip, skipWhile, switchMap, take } from 'rxjs/operators';
import {
  Response,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import {
  ServicesService,
  ScheduledServiceService,
  ProviderServiciosService,
  ScheduledProviderServiceService,
  ProveedoresService,
} from 'src/app/core/services/api/services';
import { TabsService } from './services/tabs.service';
import { Storage } from '@capacitor/storage';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private providerServicesService: ProviderServiciosService,
    private tabService: TabsService,
    private scheduledProviderService: ScheduledProviderServiceService,
    private providerService: ProveedoresService,
    private authService: AuthService
  ) {}
  currentUser = JSON.parse(this.authService.loggedUser.value.value);

  ngOnInit() {
    this.getUserScheduledServices();
  }

  getUserScheduledServices() {
    console.log(this.currentUser);
    if (this.currentUser.Role == 1) {
      this.scheduledServices
        .getApiScheduledServiceClientIdGetScheduledServicesByClientId(
          this.currentUser.UserId
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
            };

            console.log('PROVIDER NAME', providerName);

            this.tabService.addUserEvent(newEvent);
          });
        });
    } else if (this.currentUser.Role == 2) {
      this.scheduledServices
        .getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
          this.currentUser.UserId
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

            // var subscription = this.providerName.subscribe(
            //   function (x) {
            //     console.log('Next: ' + x.toString());
            //   },
            //   function (err) {
            //     console.log('Error: ' + err);
            //   },
            //   function () {
            //     console.log('Completed');
            //   }
            // );

            // this.providerName.subscribe();

            let newEvent: ServiceEvent = {
              title: servicesNames,
              startTime: new Date(element.scheduledDate),
              endTime: new Date(element.scheduledEndDate),
              desc: 'Servicio a proveer por: ' + providerName,
              allDay: false,
            };

            this.tabService.addUserEvent(newEvent);
          });
        });
    }
  }
}
