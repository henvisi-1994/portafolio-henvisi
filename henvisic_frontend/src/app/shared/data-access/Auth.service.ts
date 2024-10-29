import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BaseHttpService } from './base-http.service';
import { User } from '../../auth/login/domain/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    super();
  }

  getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

  getUserdata() {
    return this.http.get<User>(`${this.apiUrl}/usuarios/`);
  }
}
