/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { ScheduledService } from 'src/app/core/models/models';

@Injectable({
  providedIn: 'root',
})
class ScheduledServiceService extends __BaseService {
  static readonly postApiScheduledServiceCreateScheduledServicePath =
    '/api/ScheduledService/CreateScheduledService';
  static readonly putApiScheduledServiceUpdateScheduledServicePath =
    '/api/ScheduledService/updateScheduledService';
  static readonly getApiScheduledServicePath = '/api/ScheduledService';
  static readonly getApiScheduledServiceScheduledServiceIdGetScheduledServiceByIdPath =
    '/api/ScheduledService/{scheduledServiceId}/GetScheduledServiceById';
  static readonly getApiScheduledServiceProviderIdGetScheduledServicesByProviderIdPath =
    '/api/ScheduledService/{providerId}/GetScheduledServicesByProviderId';
  static readonly getApiScheduledServiceClientIdGetScheduledServicesByClientIdPath =
    '/api/ScheduledService/{clientId}/GetScheduledServicesByClientId';
  static readonly deleteApiScheduledServiceScheduledServiceIdPath =
    '/api/ScheduledService/{scheduledServiceId}';

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }
  postScheduledService(service: ScheduledService) {
    return this.http.post(
      this.rootUrl + '/api/ScheduledService/CreateScheduledService',
      service
    );
  }
  postApiScheduledServiceCreateScheduledServiceResponse(): __Observable<
    __StrictHttpResponse<null>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ScheduledService/CreateScheduledService`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  postApiScheduledServiceCreateScheduledService(): __Observable<null> {
    return this.postApiScheduledServiceCreateScheduledServiceResponse().pipe(
      __map((_r) => _r.body as null)
    );
  }
  putApiScheduledServiceUpdateScheduledServiceResponse(): __Observable<
    __StrictHttpResponse<null>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ScheduledService/updateScheduledService`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  putApiScheduledServiceUpdateScheduledService(): __Observable<null> {
    return this.putApiScheduledServiceUpdateScheduledServiceResponse().pipe(
      __map((_r) => _r.body as null)
    );
  }
  getApiScheduledServiceResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledService`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  getApiScheduledService(): __Observable<null> {
    return this.getApiScheduledServiceResponse().pipe(
      __map((_r) => _r.body as null)
    );
  }

  /**
   * @param scheduledServiceId undefined
   */
  getApiScheduledServiceScheduledServiceIdGetScheduledServiceByIdResponse(
    scheduledServiceId: number
  ): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl +
        `/api/ScheduledService/${encodeURIComponent(
          String(scheduledServiceId)
        )}/GetScheduledServiceById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param scheduledServiceId undefined
   */
  getApiScheduledServiceScheduledServiceIdGetScheduledServiceById(
    scheduledServiceId: number
  ): __Observable<null> {
    return this.getApiScheduledServiceScheduledServiceIdGetScheduledServiceByIdResponse(
      scheduledServiceId
    ).pipe(__map((_r) => _r.body as null));
  }

  /**
   * @param providerId undefined
   */
  getApiScheduledServiceProviderIdGetScheduledServicesByProviderIdResponse(
    providerId: number
  ): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl +
        `/api/ScheduledService/${encodeURIComponent(
          String(providerId)
        )}/GetScheduledServicesByProviderId`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param providerId undefined
   */
  getApiScheduledServiceProviderIdGetScheduledServicesByProviderId(
    providerId: number
  ): __Observable<null> {
    return this.getApiScheduledServiceProviderIdGetScheduledServicesByProviderIdResponse(
      providerId
    ).pipe(__map((_r) => _r.body as null));
  }

  /**
   * @param clientId undefined
   */
  getApiScheduledServiceClientIdGetScheduledServicesByClientIdResponse(
    clientId: number
  ): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl +
        `/api/ScheduledService/${encodeURIComponent(
          String(clientId)
        )}/GetScheduledServicesByClientId`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param clientId undefined
   */
  getApiScheduledServiceClientIdGetScheduledServicesByClientId(
    clientId: number
  ): __Observable<null> {
    return this.getApiScheduledServiceClientIdGetScheduledServicesByClientIdResponse(
      clientId
    ).pipe(__map((_r) => _r.body as null));
  }

  /**
   * @param scheduledServiceId undefined
   */
  deleteApiScheduledServiceScheduledServiceIdResponse(
    scheduledServiceId: number
  ): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl +
        `/api/ScheduledService/${encodeURIComponent(
          String(scheduledServiceId)
        )}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param scheduledServiceId undefined
   */
  deleteApiScheduledServiceScheduledServiceId(
    scheduledServiceId: number
  ): __Observable<null> {
    return this.deleteApiScheduledServiceScheduledServiceIdResponse(
      scheduledServiceId
    ).pipe(__map((_r) => _r.body as null));
  }
}

module ScheduledServiceService {}

export { ScheduledServiceService };
