/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Observable, throwError } from 'rxjs'; // Import Observable and throwError for handling responses and errors
import { catchError, map } from 'rxjs/operators'; // Import operators for error handling and data transformation
import { HttpResponseGet } from '../interfaces/HttpResponseGet';
import { ApiError } from '../interfaces/ApiError';
import { ParamsType } from '../interfaces/ParamsType';
import { BaseHttpService } from '../data-access/base-http.service';
import { Injectable } from '@angular/core';
import { HttpResponsePut } from '../interfaces/HttpResponsePut';
import { HttpResponseDelete } from '../interfaces/HttpResponseDelete';
import { ResponseItem } from '../interfaces/ResponseItem';
import { HttpResponseList } from '../interfaces/HttpResponseList';
import { HttpResponsePost } from '../interfaces/HttpResponsePost';


@Injectable({
  providedIn: 'root',
})
export class DataRepository<T> extends BaseHttpService {
  public endpoint: string ='';

  constructor() {
    super();
  }

  listar<C = T>(args?: ParamsType): Observable<HttpResponseGet<C[]>> {
    const url = this.getEndpointUrl({args});

    return this.http.get<HttpResponseGet<C[]>>(url)
      .pipe(
        map((response: HttpResponseGet<C[]>) => ({
          response,
          result: response.result,
        })),
        catchError((error: HttpErrorResponse) => throwError(() => new ApiError(error)))
      );
  }
  filtrar<C = T>(uri: string): Observable<HttpResponseGet<HttpResponseList<C>>> {
    const url = this.getEndpointUrl({uri}); // Function to construct the URL with the filter string
    return this.http.get<HttpResponseGet<HttpResponseList<C>>>(url)
      .pipe(
        map((response: HttpResponseGet<HttpResponseList<C>>) => {
          return {
            response,
            result: response.data.results,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  consultar<C = T>(id: number,args?: ParamsType): Observable<HttpResponseGet<C[]>> {
    const url = this.getEndpointUrl({id,args});

    return this.http.get<HttpResponseGet<C[]>>(url)
      .pipe(
        map((response: HttpResponseGet<C[]>) => ({
          response,
          result: response.result,
        })),
        catchError((error: HttpErrorResponse) => throwError(() => new ApiError(error)))
      );
  }
  objecto<C = T>(args?: ParamsType): Observable<C> {
    const url = this.getEndpointUrl({ args });

    return this.http.get<HttpResponseGet<C>>(url).pipe(
      map((response: HttpResponseGet<C>) => {
        if (response.model == null) {
          throw new Error("No se encontró el objeto solicitado");
        }
        return response.model;
      }),
      catchError((error: HttpErrorResponse) => throwError(() => new ApiError(error)))
    );
  }
  guardar(entidad: T, params?: ParamsType): Observable<ResponseItem<T, HttpResponsePost<T>>> {
    const url = this.getEndpointUrl({args:params}); // Function to construct the URL with optional parameters

    const formData = this.convertirJsonAFormData(entidad);

    return this.http.post<HttpResponsePost<T>>(url, formData)
      .pipe(
        map((response: HttpResponsePost<T>) => {
          return {
            response,
            result: response.modelo,
            mensaje: response.mensaje, // Assuming the response contains a message
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  guardarListado(listado: T[], params?: ParamsType): Observable<any> {
    const url = this.getEndpointUrl({args:params}); // Function to construct the URL with optional parameters

    return this.http.post<HttpResponsePost<T>>(url, listado)
      .pipe(
        map((response: HttpResponsePost<T>) => {
          return {
            response,
            result: response.modelo, // Assuming the response contains the saved list
            mensaje: response.mensaje, // Assuming the response contains a message
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  guardarData(entidad: T, params?: ParamsType): Observable<ResponseItem<T, HttpResponsePost<T>>> {
    const url = this.getEndpointUrl({args:params}); // Function to construct the URL with optional parameters

    return this.http.post<HttpResponsePost<T>>(url, entidad)
      .pipe(
        map((response: HttpResponsePost<T>) => {
          return {
            response,
            result: response.modelo,
            mensaje: response.mensaje, // Assuming the response contains a message
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  editarListado(entidad: T[], params?: ParamsType): Observable<unknown> {
    const url = this.getEndpointUrl({args:params}); // Function to construct the URL with optional parameters

    return this.http.put<HttpResponsePut<T[]>>(url, entidad).pipe(
      map((response: HttpResponsePut<T[]>) => ({
        response,
        result: response.result,
        mensaje: response.mensaje, // Assuming the response contains a message
      })),
      catchError((error: HttpErrorResponse) =>
        throwError(() => new ApiError(error))
      )
    );
  }
  editar(id: number , entidad: T, params?: ParamsType): Observable<any> {
    const url = this.getEndpointUrl({id, args:params}); // Function to construct the URL with optional parameters

    return this.http.put<HttpResponsePut<T>>(url, entidad)
      .pipe(
        map((response: HttpResponsePut<T>) => {
          return {
            response,
            result: response.result,
            mensaje: response.mensaje, // Assuming the response contains a message
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  editarParcial(id: number, data: { [key: string]: any }, args?: any): Observable<any> {
    const url = this.getEndpointUrl({id, args}); // Function to construct the URL with optional parameters

    return this.http.patch<HttpResponsePut<T>>(url, data)
      .pipe(
        map((response: HttpResponsePut<T>) => {
          return {
            response,
            result: response.result,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  eliminar(id: number): Observable<ResponseItem<T, HttpResponseDelete<T>>> {
    const url = this.getEndpointUrl({id}); // Function to construct the URL with the id

    return this.http.delete<HttpResponseDelete<T>>(url)
      .pipe(
        map((response: HttpResponseDelete<T>) => {
          return {
            response,
            result: response.result, // Assuming "mensaje" holds the deletion message
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ApiError(error)); // Handle errors and throw a custom ApiError
        })
      );
  }
  private getEndpointUrl(params?: { id?: number; args?: ParamsType; uri?: string }): string {
    let url = `${this.apiUrl}/${this.endpoint}`;

    if (params?.id !== undefined && params.id > 0) {
      url += `/${params.id}`;
    }

    if (params?.uri) {
      url += `?${params.uri}`;
    } else if (params?.args) {
      url += `?${this.buildQueryString(params.args)}`;
    }

    return url;
  }
  private buildQueryString(args: ParamsType): string {
    const params = new URLSearchParams();
    for (const key in args) {
      if (Object.prototype.hasOwnProperty.call(args, key) && args[key] !== undefined) {
        params.append(key, args[key] as string);
      }
    }
    return params.toString();
  }
  private convertirJsonAFormData(entidad: any): FormData {
    const formData = new FormData();

    for (const key in entidad) {
      if (Object.prototype.hasOwnProperty.call(entidad, key) && entidad[key] !== undefined) {
        formData.append(key, entidad[key]);
      }
    }

    return formData;
  }
}
