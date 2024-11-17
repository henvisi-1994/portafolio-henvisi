import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { CategoryComponent } from "./category/category.component";
import { ServiceComponent } from "./service/service.component";
import { SkillComponent } from "./skill/skill.component";
import { QualificationComponent } from "./qualification/qualification.component";
import { PortafolioComponent } from "./portafolio/portafolio.component";
import { AuthGuard } from "../auth.guard";
import { AboutMeComponent } from "./AboutMe/AboutMe.component";
import { SettingComponent } from "./Setting/Setting.component";


export const ADMIN_ROUTES:Routes= [
  { path: '', component: AdminLayoutComponent,    canActivate: [AuthGuard],
    children: [
    { path: 'category', component: CategoryComponent },
    { path: 'service', component: ServiceComponent },
    { path: 'skill', component: SkillComponent },
    { path: 'qualification', component: QualificationComponent },
    { path: 'portfolio', component: PortafolioComponent },
    { path: 'aboutme', component: AboutMeComponent },
    { path: 'setting', component: SettingComponent },
  ]},
]
