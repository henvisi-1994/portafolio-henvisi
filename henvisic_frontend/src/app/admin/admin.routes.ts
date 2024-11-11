import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { CategoryComponent } from "./category/category.component";
import { ServiceComponent } from "./service/service.component";
import { SkillComponent } from "./skill/skill.component";
import { QualificationComponent } from "./qualification/qualification.component";
import { PortafolioComponent } from "./portafolio/portafolio.component";


export const ADMIN_ROUTES:Routes= [
  { path: '', component: AdminLayoutComponent, children: [
    { path: 'category', component: CategoryComponent },
    { path: 'service', component: ServiceComponent },
    { path: 'skill', component: SkillComponent },
    { path: 'qualification', component: QualificationComponent },
    { path: 'portfolio', component: PortafolioComponent },
  ]},
]
