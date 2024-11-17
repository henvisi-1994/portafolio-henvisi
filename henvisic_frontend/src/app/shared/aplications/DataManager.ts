/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataRepository } from '../infraestructure/DataRepository.service';
import Swal from 'sweetalert2';
import { ParamsType } from '../interfaces/ParamsType';

@Injectable({
  providedIn: 'root',
})
export class DataManager<T> {
  private tableData: T[][] = [];

  constructor(private dataRepository: DataRepository<T>) {}

  loadData(endpoint: string): Observable<T[][]> {
    this.dataRepository.endpoint = endpoint;
    return this.dataRepository.listar().pipe(
      map((data) => {
        return data.result;
      })
    );
  }
  getModelData<C>(endpoint: string, args?: ParamsType): Observable<C> {
    this.dataRepository.endpoint = endpoint;
    return this.dataRepository.objecto<C>(args);
  }

  guardar(endpoint: string, model: T): Observable<T> {
    this.dataRepository.endpoint = endpoint;
    return this.dataRepository.guardar(model).pipe(
      map((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.response.mensaje,
          showConfirmButton: false,
          timer: 1500
        });
        return data.result;
      })
    );
  }

  editar(id:number,endpoint: string, model: T): Observable<T> {
    this.dataRepository.endpoint = endpoint;
    return this.dataRepository.editar(id,model).pipe(
      map((data) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.response.mensaje,
          showConfirmButton: false,
          timer: 1500
        });

        return data.result;
      })
    );
  }
  eliminar(id: number, endpoint: string): Observable<T> {
    this.dataRepository.endpoint = endpoint;
    return this.dataRepository.eliminar(id).pipe(
      map((data) => {
        return data.result;
      })
    );
  }

  getTableData(): T[][] {
    return this.tableData;
  }
}
