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
import { TabsService } from 'src/app/public/tabs/services/tabs.service';

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
    private providerService: ProveedoresService
  ) {}

  ngOnInit() {
    this.getUserScheduledServices();
  }

  getUserScheduledServices() {
    this.scheduledServices
      .getApiScheduledServiceClientIdGetScheduledServicesByClientId(3)
      .subscribe((response: Response) => {
        response.result.forEach((element: ScheduledService) => {
          console.log('ELEMENT:', element);

          let servicesNames = '';
          let providerName = '';
          let counter = 0;
          element.scheduledProviderServices.forEach((element) => {
            servicesNames += element.providerServiceName;
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

          console.log('PROVIDER NAME', providerName);

          this.tabService.addUserEvent(newEvent);
        });
      });
  }
}
