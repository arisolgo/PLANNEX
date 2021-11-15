import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  Response,
  ScheduledProviderService,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import {
  ServicesService,
  ScheduledServiceService,
  ProviderServiciosService,
  ScheduledProviderServiceService,
} from 'src/app/core/services/api/services';
import { TabsService } from './services/tabs.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private scheduledProviderServicesService: ScheduledProviderServiceService,
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
          this.scheduledProviderServicesService
            .getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceId(
              element.id
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
