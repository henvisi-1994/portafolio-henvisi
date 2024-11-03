import { Routes } from "@angular/router";
import { ZonaEducativaComponent } from "../zona-educativa/zona-educativa/zona-educativa.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";


export const ADMIN_ROUTES:Routes= [
  { path: 'zona-educativa', component: AdminLayoutComponent, children: [
    { path: '', component: ZonaEducativaComponent },
  ]},
]
