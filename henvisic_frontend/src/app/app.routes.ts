import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./principal/principal.routes').then(m => m.PRINCIPAL_ROUTES) },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES) },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES) },

];
