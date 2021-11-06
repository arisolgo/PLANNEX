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
class ProveedorDisponibilidadesService extends __BaseService {
  static readonly getApiProveedorDisponibilidadesPath = '/api/ProveedorDisponibilidades';
  static readonly getApiProveedorDisponibilidadesProveedorDisponibilidadIdGetProveedorDisponibilidadByIdPath = '/api/ProveedorDisponibilidades/{proveedorDisponibilidadId}/GetProveedorDisponibilidadById';
  static readonly getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorIdPath = '/api/ProveedorDisponibilidades/{proveedorId}/GetDisponibilidadByProveedorId';
  static readonly putApiProveedorDisponibilidadesUpdateProveedorDisponibilidadPath = '/api/ProveedorDisponibilidades/updateProveedorDisponibilidad';
  static readonly postApiProveedorDisponibilidadesCreateProveedorDisponibilidadPath = '/api/ProveedorDisponibilidades/CreateProveedorDisponibilidad';
  static readonly deleteApiProveedorDisponibilidadesProveedorDisponibilidadIdPath = '/api/ProveedorDisponibilidades/{proveedorDisponibilidadId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getApiProveedorDisponibilidadesResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorDisponibilidades`,
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
  }  getApiProveedorDisponibilidades(): __Observable<null> {
    return this.getApiProveedorDisponibilidadesResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param proveedorDisponibilidadId undefined
   */
  getApiProveedorDisponibilidadesProveedorDisponibilidadIdGetProveedorDisponibilidadByIdResponse(proveedorDisponibilidadId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorDisponibilidades/${encodeURIComponent(String(proveedorDisponibilidadId))}/GetProveedorDisponibilidadById`,
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
   * @param proveedorDisponibilidadId undefined
   */
  getApiProveedorDisponibilidadesProveedorDisponibilidadIdGetProveedorDisponibilidadById(proveedorDisponibilidadId: number): __Observable<null> {
    return this.getApiProveedorDisponibilidadesProveedorDisponibilidadIdGetProveedorDisponibilidadByIdResponse(proveedorDisponibilidadId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param proveedorId undefined
   */
  getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorIdResponse(proveedorId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorDisponibilidades/${encodeURIComponent(String(proveedorId))}/GetDisponibilidadByProveedorId`,
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
   * @param proveedorId undefined
   */
  getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorId(proveedorId: number): __Observable<null> {
    return this.getApiProveedorDisponibilidadesProveedorIdGetDisponibilidadByProveedorIdResponse(proveedorId).pipe(
      __map(_r => _r.body as null)
    );
  }
  putApiProveedorDisponibilidadesUpdateProveedorDisponibilidadResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ProveedorDisponibilidades/updateProveedorDisponibilidad`,
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
  }  putApiProveedorDisponibilidadesUpdateProveedorDisponibilidad(): __Observable<null> {
    return this.putApiProveedorDisponibilidadesUpdateProveedorDisponibilidadResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  postApiProveedorDisponibilidadesCreateProveedorDisponibilidadResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ProveedorDisponibilidades/CreateProveedorDisponibilidad`,
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
  }  postApiProveedorDisponibilidadesCreateProveedorDisponibilidad(): __Observable<null> {
    return this.postApiProveedorDisponibilidadesCreateProveedorDisponibilidadResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ProveedorDisponibilidadesService.DeleteApiProveedorDisponibilidadesProveedorDisponibilidadIdParams` containing the following parameters:
   *
   * - `proveedorDisponibilidadId`:
   *
   * - `proveedorId`:
   */
  deleteApiProveedorDisponibilidadesProveedorDisponibilidadIdResponse(params: ProveedorDisponibilidadesService.DeleteApiProveedorDisponibilidadesProveedorDisponibilidadIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.proveedorId != null) __params = __params.set('proveedorId', params.proveedorId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ProveedorDisponibilidades/${encodeURIComponent(String(params.proveedorDisponibilidadId))}`,
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
   * @param params The `ProveedorDisponibilidadesService.DeleteApiProveedorDisponibilidadesProveedorDisponibilidadIdParams` containing the following parameters:
   *
   * - `proveedorDisponibilidadId`:
   *
   * - `proveedorId`:
   */
  deleteApiProveedorDisponibilidadesProveedorDisponibilidadId(params: ProveedorDisponibilidadesService.DeleteApiProveedorDisponibilidadesProveedorDisponibilidadIdParams): __Observable<null> {
    return this.deleteApiProveedorDisponibilidadesProveedorDisponibilidadIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ProveedorDisponibilidadesService {

  /**
   * Parameters for deleteApiProveedorDisponibilidadesProveedorDisponibilidadId
   */
  export interface DeleteApiProveedorDisponibilidadesProveedorDisponibilidadIdParams {
    proveedorDisponibilidadId: number;
    proveedorId?: number;
  }
}

export { ProveedorDisponibilidadesService }
