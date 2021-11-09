import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, forkJoin, zip } from 'rxjs';
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
    private providerServicesService: ProviderServiciosService,
    private tabService: TabsService,
    private scheduledProviderService: ScheduledProviderServiceService
  ) {}

  ngOnInit() {
    this.getUserScheduledServices();
  }

  getScheduledProviderServices() {
    //scheduledServiceId
    this.scheduledProviderService.getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceId();
  }

  getUserScheduledServices() {
    //response.result.id
    let scheduledServicesArray: ScheduledService[] = [];
    let scheduledProviderServiceObs = [];
    let getScheduledService = this.scheduledServices
      .getApiScheduledServiceClientIdGetScheduledServicesByClientId(1)
      .pipe(
        map((scheduledServices: Response) => {
          scheduledServices.result.forEach((element: ScheduledService) => {
            scheduledProviderServiceObs.push(
              this.scheduledProviderService.getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceId(
                element.id
              )
            );
          });
        })
      );
    getScheduledService
      .pipe(switchMap(() => forkJoin(scheduledProviderServiceObs)))
      .subscribe((result) => console.log(result));

    // this.scheduledServices
    //   .getApiScheduledServiceClientIdGetScheduledServicesByClientId(1)
    //   .subscribe((response: Response) => {
    //     response.result.forEach((element: ScheduledService) => {
    //       this.providerServicesService
    //         .getApiProviderServiciosProviderServiceIdGetProviderServiceById(
    //           element.providerServiceId
    //         )
    //         .pipe(
    //           switchMap((providerService: Response) =>
    //             this.servicesService
    //               .getApiServicesId(providerService.result.serviceId)
    //               .pipe(map((service: Response) => [providerService, service]))
    //           )
    //         )
    //         .subscribe((responses: Response[]) => {
    //           let newEvent: ServiceEvent = {
    //             title: responses[1].result.description,
    //             startTime: new Date(element.scheduledDate),
    //             endTime: moment(element.scheduledDate)
    //               .add(responses[0].result.duration, 'm')
    //               .toDate(),
    //             desc: '',
    //             allDay: false,
    //           };
    //           this.tabService.addUserEvent(newEvent);
    //         });
    //     });
    //   });
  }
}
