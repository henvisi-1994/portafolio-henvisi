import { Routes } from "@angular/router";
import { PrincipalComponent } from "../principal/principal/principal.component";
import { PrincipalLayoutComponent } from "./principal-layout/principal-layout.component";

export const PRINCIPAL_ROUTES:Routes= [
  { path: '',  component: PrincipalLayoutComponent,children:[
    { path: '', component: PrincipalComponent },
  ] },

]
