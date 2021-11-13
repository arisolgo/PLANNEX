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
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  currentUser = {};

  constructor(
    private servicesService: ServicesService,
    private scheduledServices: ScheduledServiceService,
    private providerServicesService: ProviderServiciosService,
    private tabService: TabsService,
    private scheduledProviderService: ScheduledProviderServiceService
  ) {}

  async ngOnInit() {
    this.currentUser = JSON.parse(
      (await Storage.get({ key: 'currentUser' })).value
    );
    console.log(this.currentUser);
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
  }
}
