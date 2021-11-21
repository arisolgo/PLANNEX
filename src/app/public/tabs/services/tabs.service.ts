import { Injectable } from '@angular/core';
import { ServiceEvent } from 'src/app/core/models/models';
import { BehaviorSubject, Observable, zip } from 'rxjs';

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

  resetUserEvents() {
    this.userEvents.next([]);
  }
}
