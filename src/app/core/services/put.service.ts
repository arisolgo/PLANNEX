import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client, ScheduledService } from '../models/models';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class PutService {
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

  updateScheduledService(scheduledService: ScheduledService) {
    return this.http.put(
      this.rootUrl + '/api/ScheduledService/updateScheduledService',
      scheduledService
    );
  }
}
