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
class ProviderServiciosService extends __BaseService {
  static readonly getApiProviderServiciosPath = '/api/ProviderServicios';
  static readonly getApiProviderServiciosProviderServiceIdGetProviderServiceByIdPath = '/api/ProviderServicios/{providerServiceId}/GetProviderServiceById';
  static readonly getApiProviderServiciosProviderIdGetProviderServiceByProviderIdPath = '/api/ProviderServicios/{providerId}/GetProviderServiceByProviderId';
  static readonly putApiProviderServiciosUpdateProviderServicePath = '/api/ProviderServicios/updateProviderService';
  static readonly postApiProviderServiciosCreateProviderServicePath = '/api/ProviderServicios/CreateProviderService';
  static readonly deleteApiProviderServiciosProviderServiceIdPath = '/api/ProviderServicios/{providerServiceId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getApiProviderServiciosResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProviderServicios`,
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
  }  getApiProviderServicios(): __Observable<null> {
    return this.getApiProviderServiciosResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param providerServiceId undefined
   */
  getApiProviderServiciosProviderServiceIdGetProviderServiceByIdResponse(providerServiceId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProviderServicios/${encodeURIComponent(String(providerServiceId))}/GetProviderServiceById`,
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
   * @param providerServiceId undefined
   */
  getApiProviderServiciosProviderServiceIdGetProviderServiceById(providerServiceId: number): __Observable<null> {
    return this.getApiProviderServiciosProviderServiceIdGetProviderServiceByIdResponse(providerServiceId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param providerId undefined
   */
  getApiProviderServiciosProviderIdGetProviderServiceByProviderIdResponse(providerId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProviderServicios/${encodeURIComponent(String(providerId))}/GetProviderServiceByProviderId`,
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
   * @param providerId undefined
   */
  getApiProviderServiciosProviderIdGetProviderServiceByProviderId(providerId: number): __Observable<null> {
    return this.getApiProviderServiciosProviderIdGetProviderServiceByProviderIdResponse(providerId).pipe(
      __map(_r => _r.body as null)
    );
  }
  putApiProviderServiciosUpdateProviderServiceResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ProviderServicios/updateProviderService`,
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
  }  putApiProviderServiciosUpdateProviderService(): __Observable<null> {
    return this.putApiProviderServiciosUpdateProviderServiceResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  postApiProviderServiciosCreateProviderServiceResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ProviderServicios/CreateProviderService`,
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
  }  postApiProviderServiciosCreateProviderService(): __Observable<null> {
    return this.postApiProviderServiciosCreateProviderServiceResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ProviderServiciosService.DeleteApiProviderServiciosProviderServiceIdParams` containing the following parameters:
   *
   * - `providerServiceId`:
   *
   * - `providerId`:
   */
  deleteApiProviderServiciosProviderServiceIdResponse(params: ProviderServiciosService.DeleteApiProviderServiciosProviderServiceIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.providerId != null) __params = __params.set('providerId', params.providerId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ProviderServicios/${encodeURIComponent(String(params.providerServiceId))}`,
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
   * @param params The `ProviderServiciosService.DeleteApiProviderServiciosProviderServiceIdParams` containing the following parameters:
   *
   * - `providerServiceId`:
   *
   * - `providerId`:
   */
  deleteApiProviderServiciosProviderServiceId(params: ProviderServiciosService.DeleteApiProviderServiciosProviderServiceIdParams): __Observable<null> {
    return this.deleteApiProviderServiciosProviderServiceIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ProviderServiciosService {

  /**
   * Parameters for deleteApiProviderServiciosProviderServiceId
   */
  export interface DeleteApiProviderServiciosProviderServiceIdParams {
    providerServiceId: number;
    providerId?: number;
  }
}

export { ProviderServiciosService }
