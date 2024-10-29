import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../domain/User.interface';
import { computed, forwardRef, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../shared/data-access/Auth.service';

interface AuthState {
  user: User | null;
  state: 'Loading' | 'Loded' | 'Error';
}
const initialState: AuthState = {
  user: null,
  state: 'Loading',
};
export const AuthStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed(({ user }) => ({
    userData: computed(() => user()),
  })),
  withMethods((store, authService = inject(forwardRef(() => AuthService))) => ({

    setUser(userNew: User | null) {
      patchState(store, { user: userNew });
    },
    getUser: rxMethod(
      pipe(
        tap(() => patchState(store, { state: 'Loading' })),
        switchMap(() => {
          return authService.getUserdata().pipe(
            tap((user:User) => {
              patchState(store, { user, state: 'Loded' });
            })
          );
        })
      )
    ),
    can(permiso: string): boolean {
      const user = store.user();
      return user?.permisos.includes(permiso) ?? false;
    },
  }))
);
