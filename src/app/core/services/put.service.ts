import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client, ScheduledService } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PutService {
  constructor(private http: HttpClient) {}
  rootUrl = environment.devRootUrl;

  updateScheduledService(scheduledService: ScheduledService) {
    return this.http.put(
      this.rootUrl + '/api/ScheduledService/updateScheduledService',
      scheduledService
    );
  }
}
