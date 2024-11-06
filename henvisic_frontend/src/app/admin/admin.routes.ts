import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { CategoryComponent } from "./category/category.component";
import { ServiceComponent } from "./service/service.component";


export const ADMIN_ROUTES:Routes= [
  { path: '', component: AdminLayoutComponent, children: [
    { path: 'category', component: CategoryComponent },
    { path: 'service', component: ServiceComponent },
  ]},
]
