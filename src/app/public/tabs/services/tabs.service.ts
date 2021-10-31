import { Injectable } from '@angular/core';
import {
  ProviderServiciosService,
  ScheduledServiceService,
  ServicesService,
} from 'src/app/core/services/api/services';
import {
  Response,
  ScheduledService,
  ServiceEvent,
} from 'src/app/core/models/models';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  userEvents: BehaviorSubject<ServiceEvent[]> = new BehaviorSubject([]);

  constructor() {}

  getUserEventsValue() {
    return this.userEvents;
  }

  addUserEvent(event: ServiceEvent) {
    let newArray = this.userEvents.value;
    newArray.push(event);
    this.userEvents.next(newArray);
  }
}
