/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class ScheduledProviderServiceService extends __BaseService {
  static readonly postApiScheduledProviderServiceCreateScheduledProviderServicePath = '/api/ScheduledProviderService/CreateScheduledProviderService';
  static readonly putApiScheduledProviderServiceUpdateScheduledProviderServicePath = '/api/ScheduledProviderService/updateScheduledProviderService';
  static readonly getApiScheduledProviderServicePath = '/api/ScheduledProviderService';
  static readonly getApiScheduledProviderServiceScheduledProviderServiceIdGetScheduledProviderServiceByIdPath = '/api/ScheduledProviderService/{scheduledProviderServiceId}/GetScheduledProviderServiceById';
  static readonly getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceIdPath = '/api/ScheduledProviderService/GetScheduledProviderServicesByScheduledServiceId';
  static readonly deleteApiScheduledProviderServiceScheduledProviderServiceIdPath = '/api/ScheduledProviderService/{scheduledProviderServiceId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  postApiScheduledProviderServiceCreateScheduledProviderServiceResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ScheduledProviderService/CreateScheduledProviderService`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  postApiScheduledProviderServiceCreateScheduledProviderService(): __Observable<null> {
    return this.postApiScheduledProviderServiceCreateScheduledProviderServiceResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  putApiScheduledProviderServiceUpdateScheduledProviderServiceResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ScheduledProviderService/updateScheduledProviderService`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  putApiScheduledProviderServiceUpdateScheduledProviderService(): __Observable<null> {
    return this.putApiScheduledProviderServiceUpdateScheduledProviderServiceResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  getApiScheduledProviderServiceResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledProviderService`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  getApiScheduledProviderService(): __Observable<null> {
    return this.getApiScheduledProviderServiceResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param scheduledProviderServiceId undefined
   */
  getApiScheduledProviderServiceScheduledProviderServiceIdGetScheduledProviderServiceByIdResponse(scheduledProviderServiceId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledProviderService/${encodeURIComponent(String(scheduledProviderServiceId))}/GetScheduledProviderServiceById`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param scheduledProviderServiceId undefined
   */
  getApiScheduledProviderServiceScheduledProviderServiceIdGetScheduledProviderServiceById(scheduledProviderServiceId: number): __Observable<null> {
    return this.getApiScheduledProviderServiceScheduledProviderServiceIdGetScheduledProviderServiceByIdResponse(scheduledProviderServiceId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param scheduledServiceId undefined
   */
  getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceIdResponse(scheduledServiceId?: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (scheduledServiceId != null) __params = __params.set('scheduledServiceId', scheduledServiceId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledProviderService/GetScheduledProviderServicesByScheduledServiceId`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param scheduledServiceId undefined
   */
  getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceId(scheduledServiceId?: number): __Observable<null> {
    return this.getApiScheduledProviderServiceGetScheduledProviderServicesByScheduledServiceIdResponse(scheduledServiceId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param scheduledProviderServiceId undefined
   */
  deleteApiScheduledProviderServiceScheduledProviderServiceIdResponse(scheduledProviderServiceId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ScheduledProviderService/${encodeURIComponent(String(scheduledProviderServiceId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param scheduledProviderServiceId undefined
   */
  deleteApiScheduledProviderServiceScheduledProviderServiceId(scheduledProviderServiceId: number): __Observable<null> {
    return this.deleteApiScheduledProviderServiceScheduledProviderServiceIdResponse(scheduledProviderServiceId).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ScheduledProviderServiceService {
}

export { ScheduledProviderServiceService }
