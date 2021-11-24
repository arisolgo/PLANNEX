import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Client,
  ScheduledService,
  Provider,
  ProviderAvailability,
  ProviderService,
  ProviderTipo,
} from '../models/models';
import { Capacitor } from '@capacitor/core';
import { ProviderServiciosService } from './api/services';

@Injectable({
  providedIn: 'root',
})
export class PutService {
  rootUrl = '';
  constructor(private http: HttpClient) {
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      this.rootUrl = environment.devRootUrl;
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

  updateProvider(provider) {
    return this.http.put(
      this.rootUrl + '/api/Proveedores/' + provider.Id,
      provider
    );
  }

  updateClient(client: Client) {
    return this.http.put(this.rootUrl + '/api/Clientes/' + client.id, client);
  }

  updateAvailability(providerAvailability: ProviderAvailability) {
    return this.http.put(
      this.rootUrl +
        '/api/ProveedorDisponibilidades/updateProveedorDisponibilidad',
      providerAvailability
    );
  }

  updateProviderService(providerService: ProviderService) {
    return this.http.put(
      this.rootUrl + '/api/ProviderServicios/updateProviderService',
      providerService
    );
  }

  updateProviderType(providerType: ProviderTipo) {
    return this.http.put(
      this.rootUrl + '/api/ProveedorTipos/updateProveedorTipo',
      providerType
    );
  }

  deleteProviderType(providerTypeId) {
    return this.http.delete(
      this.rootUrl + '/api/ProveedorTipos/',
      providerTypeId
    );
  }
}
