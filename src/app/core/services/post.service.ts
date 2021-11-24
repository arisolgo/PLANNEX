import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Client,
  ProviderAvailability,
  ProviderService,
  ScheduledService,
} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  rootUrl = environment.devRootUrl;

  createScheduledService(scheduledService: ScheduledService) {
    return this.http.post(
      this.rootUrl + '/api/ScheduledService/CreateScheduledService',
      scheduledService
    );
  }
  createAvailability(providerAvailability: ProviderAvailability) {
    return this.http.post(
      this.rootUrl +
        '/api/ProveedorDisponibilidades/CreateProveedorDisponibilidad',
      providerAvailability
    );
  }

  createProviderService(providerService: ProviderService) {
    return this.http.post(
      this.rootUrl + '/api/ProviderServicios/CreateProviderService',
      providerService
    );
  }
}
