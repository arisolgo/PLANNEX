import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  Response,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import {
  ServicesService,
  ScheduledServiceService,
  ProviderServiciosService,
} from 'src/app/core/services/api/services';
import { TabsService } from './services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  scheduledService;
  providerService;
  service;
  userEvents: BehaviorSubject<ServiceEvent[]> = new BehaviorSubject([]);
  title: BehaviorSubject<string> = new BehaviorSubject('');

  minutesToAdd: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private providerServicesService: ProviderServiciosService,
    private tabService: TabsService
  ) {}

  ngOnInit() {
    this.getUserScheduledServices();
  }

  getUserScheduledServices() {
    this.scheduledServices
      .getApiScheduledServiceClientIdGetScheduledServicesByClientId(1)
      .subscribe((response: Response) => {
        response.result.forEach((element: ScheduledService) => {
          this.providerServicesService
            .getApiProviderServiciosProviderServiceIdGetProviderServiceById(
              element.providerServiceId
            )
            .pipe(
              switchMap((providerService: Response) =>
                this.servicesService
                  .getApiServicesId(providerService.result.serviceId)
                  .pipe(map((service: Response) => [providerService, service]))
              )
            )
            .subscribe((responses: Response[]) => {
              let newEvent: ServiceEvent = {
                title: responses[1].result.description,
                startTime: new Date(element.scheduledDate),
                endTime: moment(element.scheduledDate)
                  .add(responses[0].result.duration, 'm')
                  .toDate(),
                desc: '',
                allDay: false,
              };
              this.tabService.addUserEvent(newEvent);
            });
        });
      });
  }
}
