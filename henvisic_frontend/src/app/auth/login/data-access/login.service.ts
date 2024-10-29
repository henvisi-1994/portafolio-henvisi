// login.service.ts
import { Injectable, signal } from '@angular/core';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserLogin } from '../domain/UserLogin.interface';
import { AuthResponse } from '../domain/AuthResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../domain/User.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseHttpService {
  user = signal<User | null>(null);
  error = signal<HttpErrorResponse | null>(null);

  login(userLogin: UserLogin) {
    this.http.post<AuthResponse>(`${this.apiUrl}/usuarios/login`, userLogin).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.access_token);
        this.user.set(response.modelo);
        this.error.set(null);
      }),
      catchError((error) => {
        this.error.set(error);
        return of(error);
      })
    ).subscribe();
  }

}
