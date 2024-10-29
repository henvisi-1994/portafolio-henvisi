/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { acciones } from '../../../config/Utils';

@Injectable({
  providedIn: 'root'
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Referencias<T> {
  private _tabs = new BehaviorSubject<any>(null);
  private _validador = new BehaviorSubject<any>(null);
  private _listadoArchivos = new BehaviorSubject<any[]>([]);
  private _listado = new BehaviorSubject<any[]>([]);
  private _currentPageListado = new BehaviorSubject<number>(1);
  private _nextPageUrl = new BehaviorSubject<string | undefined | null>(null);
  private _accion = new BehaviorSubject<string>(acciones.NUEVO);
  private _listadosAuxiliares = new BehaviorSubject<any>({});
  private _errors = new BehaviorSubject<any>(null);

  filtros = {
    search: null,
    fields: null
  };

  constructor() { }

  get tabs(): Observable<any> {
    return this._tabs.asObservable();
  }

  set tabs(value: any) {
    this._tabs.next(value);
  }

  get validador(): Observable<any> {
    return this._validador.asObservable();
  }

  set validador(value: any) {
    this._validador.next(value);
  }

  get listadoArchivos(): Observable<any[]> {
    return this._listadoArchivos.asObservable();
  }

  set listadoArchivos(value: any[]) {
    this._listadoArchivos.next(value);
  }

  get listado(): Observable<any[]> {
    return this._listado.asObservable();
  }

  set listado(value: any[]) {
    this._listado.next(value);
  }

  get currentPageListado(): Observable<number> {
    return this._currentPageListado.asObservable();
  }

  set currentPageListado(value: number) {
    this._currentPageListado.next(value);
  }

  get nextPageUrl(): Observable<string | undefined | null> {
    return this._nextPageUrl.asObservable();
  }

  set nextPageUrl(value: string | undefined | null) {
    this._nextPageUrl.next(value);
  }

  get accion(): Observable<string> {
    return this._accion.asObservable();
  }

  set accion(value: string) {
    this._accion.next(value);
  }

  get disabled(): Observable<boolean> {
    return this.accion.pipe(
      map(accion => accion === acciones.ELIMINAR || accion === acciones.CONSULTAR)
    );
  }



  get listadosAuxiliares(): Observable<any> {
    return this._listadosAuxiliares.asObservable();
  }

  set listadosAuxiliares(value: any) {
    this._listadosAuxiliares.next(value);
  }

  get errors(): Observable<any> {
    return this._errors.asObservable();
  }

  set errors(value: any) {
    this._errors.next(value);
  }
}
