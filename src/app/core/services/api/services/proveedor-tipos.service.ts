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
class ProveedorTiposService extends __BaseService {
  static readonly getApiProveedorTiposPath = '/api/ProveedorTipos';
  static readonly getApiProveedorTiposProveedorTipoIdGetProveedorTipoByIdPath = '/api/ProveedorTipos/{proveedorTipoId}/GetProveedorTipoById';
  static readonly getApiProveedorTiposProveedorIdGetProveedorTipoByProveedorIdPath = '/api/ProveedorTipos/{proveedorId}/GetProveedorTipoByProveedorId';
  static readonly getApiProveedorTiposTipoIdGetProveedorTipoByTipoIdPath = '/api/ProveedorTipos/{tipoId}/GetProveedorTipoByTipoId';
  static readonly putApiProveedorTiposUpdateProveedorTipoPath = '/api/ProveedorTipos/updateProveedorTipo';
  static readonly postApiProveedorTiposCreateProveedorTipoPath = '/api/ProveedorTipos/CreateProveedorTipo';
  static readonly deleteApiProveedorTiposProveedorTipoIdPath = '/api/ProveedorTipos/{proveedorTipoId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getApiProveedorTiposResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorTipos`,
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
  }  getApiProveedorTipos(): __Observable<null> {
    return this.getApiProveedorTiposResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param proveedorTipoId undefined
   */
  getApiProveedorTiposProveedorTipoIdGetProveedorTipoByIdResponse(proveedorTipoId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorTipos/${encodeURIComponent(String(proveedorTipoId))}/GetProveedorTipoById`,
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
   * @param proveedorTipoId undefined
   */
  getApiProveedorTiposProveedorTipoIdGetProveedorTipoById(proveedorTipoId: number): __Observable<null> {
    return this.getApiProveedorTiposProveedorTipoIdGetProveedorTipoByIdResponse(proveedorTipoId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param proveedorId undefined
   */
  getApiProveedorTiposProveedorIdGetProveedorTipoByProveedorIdResponse(proveedorId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorTipos/${encodeURIComponent(String(proveedorId))}/GetProveedorTipoByProveedorId`,
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
  getApiProveedorTiposProveedorIdGetProveedorTipoByProveedorId(proveedorId: number): __Observable<null> {
    return this.getApiProveedorTiposProveedorIdGetProveedorTipoByProveedorIdResponse(proveedorId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param tipoId undefined
   */
  getApiProveedorTiposTipoIdGetProveedorTipoByTipoIdResponse(tipoId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorTipos/${encodeURIComponent(String(tipoId))}/GetProveedorTipoByTipoId`,
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
   * @param tipoId undefined
   */
  getApiProveedorTiposTipoIdGetProveedorTipoByTipoId(tipoId: number): __Observable<null> {
    return this.getApiProveedorTiposTipoIdGetProveedorTipoByTipoIdResponse(tipoId).pipe(
      __map(_r => _r.body as null)
    );
  }
  putApiProveedorTiposUpdateProveedorTipoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ProveedorTipos/updateProveedorTipo`,
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
  }  putApiProveedorTiposUpdateProveedorTipo(): __Observable<null> {
    return this.putApiProveedorTiposUpdateProveedorTipoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  postApiProveedorTiposCreateProveedorTipoResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ProveedorTipos/CreateProveedorTipo`,
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
  }  postApiProveedorTiposCreateProveedorTipo(): __Observable<null> {
    return this.postApiProveedorTiposCreateProveedorTipoResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ProveedorTiposService.DeleteApiProveedorTiposProveedorTipoIdParams` containing the following parameters:
   *
   * - `proveedorTipoId`:
   *
   * - `proveedorId`:
   */
  deleteApiProveedorTiposProveedorTipoIdResponse(params: ProveedorTiposService.DeleteApiProveedorTiposProveedorTipoIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.proveedorId != null) __params = __params.set('proveedorId', params.proveedorId.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ProveedorTipos/${encodeURIComponent(String(params.proveedorTipoId))}`,
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
   * @param params The `ProveedorTiposService.DeleteApiProveedorTiposProveedorTipoIdParams` containing the following parameters:
   *
   * - `proveedorTipoId`:
   *
   * - `proveedorId`:
   */
  deleteApiProveedorTiposProveedorTipoId(params: ProveedorTiposService.DeleteApiProveedorTiposProveedorTipoIdParams): __Observable<null> {
    return this.deleteApiProveedorTiposProveedorTipoIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ProveedorTiposService {

  /**
   * Parameters for deleteApiProveedorTiposProveedorTipoId
   */
  export interface DeleteApiProveedorTiposProveedorTipoIdParams {
    proveedorTipoId: number;
    proveedorId?: number;
  }
}

export { ProveedorTiposService }
