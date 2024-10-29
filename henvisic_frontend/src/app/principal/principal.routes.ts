import { Routes } from "@angular/router";
import { PrincipalComponent } from "../principal/principal/principal.component";
import { AboutComponent } from "./about/about.component";
import { QualityComponent } from "./quality/quality.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { SkillComponent } from "./skill/Skill.component";
import { ServiceComponent } from "./service/service.component";

export const PRINCIPAL_ROUTES:Routes= [
  { path: '',  component: PrincipalComponent },
  { path: 'about',  component: AboutComponent },
  { path: 'skill',  component: SkillComponent },
  { path: 'service',  component: ServiceComponent },
  { path: 'qualification',  component: QualityComponent },
  { path: 'portfolio',  component: PortfolioComponent },
  { path: 'testimonial',  component: TestimonialComponent },
  { path: 'contact',  component: TestimonialComponent },

]
