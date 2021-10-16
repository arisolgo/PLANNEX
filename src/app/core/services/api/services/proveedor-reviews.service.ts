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
class ProveedorReviewsService extends __BaseService {
  static readonly getApiProveedorReviewsPath = '/api/ProveedorReviews';
  static readonly postApiProveedorReviewsPath = '/api/ProveedorReviews';
  static readonly getApiProveedorReviewsProveedorIdGetProveedorReviewsByProveedorIdPath = '/api/ProveedorReviews/{proveedorId}/GetProveedorReviewsByProveedorId';
  static readonly getApiProveedorReviewsIdPath = '/api/ProveedorReviews/{id}';
  static readonly putApiProveedorReviewsClienteIdProveedorIdPath = '/api/ProveedorReviews/{clienteId}/{proveedorId}';
  static readonly deleteApiProveedorReviewsIdClienteIdProveedorIdPath = '/api/ProveedorReviews/{id}/{clienteId}/{proveedorId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getApiProveedorReviewsResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorReviews`,
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
  }  getApiProveedorReviews(): __Observable<null> {
    return this.getApiProveedorReviewsResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  postApiProveedorReviewsResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ProveedorReviews`,
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
  }  postApiProveedorReviews(): __Observable<null> {
    return this.postApiProveedorReviewsResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param proveedorId undefined
   */
  getApiProveedorReviewsProveedorIdGetProveedorReviewsByProveedorIdResponse(proveedorId: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorReviews/${encodeURIComponent(String(proveedorId))}/GetProveedorReviewsByProveedorId`,
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
  getApiProveedorReviewsProveedorIdGetProveedorReviewsByProveedorId(proveedorId: number): __Observable<null> {
    return this.getApiProveedorReviewsProveedorIdGetProveedorReviewsByProveedorIdResponse(proveedorId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  getApiProveedorReviewsIdResponse(id: number): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ProveedorReviews/${encodeURIComponent(String(id))}`,
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
   * @param id undefined
   */
  getApiProveedorReviewsId(id: number): __Observable<null> {
    return this.getApiProveedorReviewsIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ProveedorReviewsService.PutApiProveedorReviewsClienteIdProveedorIdParams` containing the following parameters:
   *
   * - `proveedorId`:
   *
   * - `clienteId`:
   */
  putApiProveedorReviewsClienteIdProveedorIdResponse(params: ProveedorReviewsService.PutApiProveedorReviewsClienteIdProveedorIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ProveedorReviews/${encodeURIComponent(String(params.clienteId))}/${encodeURIComponent(String(params.proveedorId))}`,
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
   * @param params The `ProveedorReviewsService.PutApiProveedorReviewsClienteIdProveedorIdParams` containing the following parameters:
   *
   * - `proveedorId`:
   *
   * - `clienteId`:
   */
  putApiProveedorReviewsClienteIdProveedorId(params: ProveedorReviewsService.PutApiProveedorReviewsClienteIdProveedorIdParams): __Observable<null> {
    return this.putApiProveedorReviewsClienteIdProveedorIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ProveedorReviewsService.DeleteApiProveedorReviewsIdClienteIdProveedorIdParams` containing the following parameters:
   *
   * - `proveedorId`:
   *
   * - `id`:
   *
   * - `clienteId`:
   */
  deleteApiProveedorReviewsIdClienteIdProveedorIdResponse(params: ProveedorReviewsService.DeleteApiProveedorReviewsIdClienteIdProveedorIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;



    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ProveedorReviews/${encodeURIComponent(String(params.id))}/${encodeURIComponent(String(params.clienteId))}/${encodeURIComponent(String(params.proveedorId))}`,
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
   * @param params The `ProveedorReviewsService.DeleteApiProveedorReviewsIdClienteIdProveedorIdParams` containing the following parameters:
   *
   * - `proveedorId`:
   *
   * - `id`:
   *
   * - `clienteId`:
   */
  deleteApiProveedorReviewsIdClienteIdProveedorId(params: ProveedorReviewsService.DeleteApiProveedorReviewsIdClienteIdProveedorIdParams): __Observable<null> {
    return this.deleteApiProveedorReviewsIdClienteIdProveedorIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ProveedorReviewsService {

  /**
   * Parameters for putApiProveedorReviewsClienteIdProveedorId
   */
  export interface PutApiProveedorReviewsClienteIdProveedorIdParams {
    proveedorId: number;
    clienteId: number;
  }

  /**
   * Parameters for deleteApiProveedorReviewsIdClienteIdProveedorId
   */
  export interface DeleteApiProveedorReviewsIdClienteIdProveedorIdParams {
    proveedorId: number;
    id: number;
    clienteId: number;
  }
}

export { ProveedorReviewsService }
