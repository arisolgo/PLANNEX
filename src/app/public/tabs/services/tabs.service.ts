import { Injectable } from '@angular/core';
import {
  ProviderServiciosService,
  ScheduledServiceService,
  ServicesService,
} from 'src/app/core/services/api/services';
import { Response, ScheduledService } from 'src/app/core/models/models';
import { BehaviorSubject, zip } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  scheduledService;
  providerService;
  service;
  userEvents;

  event = {
    title: '',
    desc: '',
    startTime: new Date(),
    endTime: new Date(),
    allDay: false,
  };

  title: BehaviorSubject<string> = new BehaviorSubject('');
  startTime = new Date();
  endTime = new Date();
  allDay: boolean;
  minutesToAdd: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private providerServicesService: ProviderServiciosService
  ) {}

  getUserScheduledServices(userEvents: any) {
    this.scheduledServices
      .getApiScheduledServiceClientIdGetScheduledServicesByClientId(1)
      .subscribe((response: Response) => {
        response.result.forEach((element: ScheduledService) => {
          this.getScheduledServiceInfo(element.providerServiceId);

          zip(this.title, this.minutesToAdd).subscribe((responses) => {
            this.event.title = responses[0];
            this.event.startTime = new Date(this.startTime);
            this.event.endTime = moment(this.startTime)
              .add(responses[1], 'm')
              .toDate();

            userEvents.events.push(this.event);
          });
        });
      });
  }

  getScheduledServiceInfo(id: number) {
    this.providerServicesService
      .getApiProviderServiciosProviderServiceIdGetProviderServiceById(id)
      .subscribe((response: Response) => {
        id = response.result.serviceId;
        this.minutesToAdd.next(response.result.duration);
      });

    this.servicesService
      .getApiServicesId(id)
      .subscribe((response: Response) => {
        this.title.next(response.result.description);
      });
  }
}
