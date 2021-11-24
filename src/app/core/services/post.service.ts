import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { Client, ScheduledService } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  rootUrl = '';
  constructor(private http: HttpClient) {
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      this.rootUrl = 'http://192.168.252.211:5000';
    } else {
      // Platform is not mobile
      this.rootUrl = environment.devRootUrl;
    }
  }

  createScheduledService(scheduledService: ScheduledService) {
    return this.http.post(
      this.rootUrl + '/api/ScheduledService/CreateScheduledService',
      scheduledService
    );
  }

  compareDistance(
    devicePushToken: string,
    scheduledService: ScheduledService,
    lat: number,
    lng: number
  ) {
    return this.http.post(
      this.rootUrl +
        `/api/ScheduledService/CompareDistance?devicePushToken=${devicePushToken}&lat=${lat}&lng=${lng}`,
      scheduledService
    );
  }
}
