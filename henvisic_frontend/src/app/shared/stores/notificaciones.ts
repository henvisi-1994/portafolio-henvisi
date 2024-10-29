import { Notificacion } from "../domain/Notificacion";
import { createAction, createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';


// Estado inicial
export interface NotificacionState {
  notificacion: Notificacion;
}

const initialState: NotificacionState = {
  notificacion: new Notificacion()
};

// Acciones
export const loadNotificacion = createAction('[Notificacion] Load Notificacion');
export const notificacionLoaded = createAction('[Notificacion] Notificacion Loaded', (notificacion: Notificacion) => ({ notificacion }));

// Reducer
export const notificacionReducer = createReducer(
  initialState,
  on(notificacionLoaded, (state, { notificacion }) => ({
    ...state,
    notificacion
  }))
);

// Selector
export const selectNotificacionState = createFeatureSelector<NotificacionState>('notificacion');
export const selectNotificacion = createSelector(
  selectNotificacionState,
  (state) => state.notificacion
);
