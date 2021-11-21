import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client, ScheduledService } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  rootUrl = 'http://192.168.0.18:5000';

  createScheduledService(scheduledService: ScheduledService) {
    return this.http.post(
      this.rootUrl + '/api/ScheduledService/CreateScheduledService',
      scheduledService
    );
  }
}
