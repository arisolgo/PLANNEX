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
class ScheduledServiceRequiredService extends __BaseService {
  static readonly postApiScheduledServiceRequiredCreateScheduledServiceRequiredPath = '/api/ScheduledServiceRequired/CreateScheduledServiceRequired';
  static readonly deleteApiScheduledServiceRequiredScheduledServiceRequiredIdPath = '/api/ScheduledServiceRequired/{scheduledServiceRequiredId}';
  static readonly getApiScheduledServiceRequiredPath = '/api/ScheduledServiceRequired';
  static readonly getApiScheduledServiceRequiredScheduledServiceRequiredIdGetScheduledServiceRequiredByIdPath = '/api/ScheduledServiceRequired/{scheduledServiceRequiredId}/GetScheduledServiceRequiredById';
  static readonly getApiScheduledServiceRequiredScheduledServiceIdGetScheduledServiceRequiredByScheduledServiceIdPath = '/api/ScheduledServiceRequired/{scheduledServiceId}/GetScheduledServiceRequiredByScheduledServiceId';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  postApiScheduledServiceRequiredCreateScheduledServiceRequiredResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ScheduledServiceRequired/CreateScheduledServiceRequired`,
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
  }  postApiScheduledServiceRequiredCreateScheduledServiceRequired(): __Observable<null> {
    return this.postApiScheduledServiceRequiredCreateScheduledServiceRequiredResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param scheduledServiceRequiredId undefined
   */
  deleteApiScheduledServiceRequiredScheduledServiceRequiredIdResponse(scheduledServiceRequiredId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ScheduledServiceRequired/${encodeURIComponent(String(scheduledServiceRequiredId))}`,
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
   * @param scheduledServiceRequiredId undefined
   */
  deleteApiScheduledServiceRequiredScheduledServiceRequiredId(scheduledServiceRequiredId: number): __Observable<null> {
    return this.deleteApiScheduledServiceRequiredScheduledServiceRequiredIdResponse(scheduledServiceRequiredId).pipe(
      __map(_r => _r.body as null)
    );
  }
  getApiScheduledServiceRequiredResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledServiceRequired`,
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
  }  getApiScheduledServiceRequired(): __Observable<null> {
    return this.getApiScheduledServiceRequiredResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param scheduledServiceRequiredId undefined
   */
  getApiScheduledServiceRequiredScheduledServiceRequiredIdGetScheduledServiceRequiredByIdResponse(scheduledServiceRequiredId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledServiceRequired/${encodeURIComponent(String(scheduledServiceRequiredId))}/GetScheduledServiceRequiredById`,
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
   * @param scheduledServiceRequiredId undefined
   */
  getApiScheduledServiceRequiredScheduledServiceRequiredIdGetScheduledServiceRequiredById(scheduledServiceRequiredId: number): __Observable<null> {
    return this.getApiScheduledServiceRequiredScheduledServiceRequiredIdGetScheduledServiceRequiredByIdResponse(scheduledServiceRequiredId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param scheduledServiceId undefined
   */
  getApiScheduledServiceRequiredScheduledServiceIdGetScheduledServiceRequiredByScheduledServiceIdResponse(scheduledServiceId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ScheduledServiceRequired/${encodeURIComponent(String(scheduledServiceId))}/GetScheduledServiceRequiredByScheduledServiceId`,
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
  getApiScheduledServiceRequiredScheduledServiceIdGetScheduledServiceRequiredByScheduledServiceId(scheduledServiceId: number): __Observable<null> {
    return this.getApiScheduledServiceRequiredScheduledServiceIdGetScheduledServiceRequiredByScheduledServiceIdResponse(scheduledServiceId).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ScheduledServiceRequiredService {
}

export { ScheduledServiceRequiredService }
