import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Setting } from "./Setting";
import { Skill } from "./Skill";
import { UserHome } from "./UserHome";
import { Service } from "./Service";
import { Category } from "./Category";
import { Portafolio } from "./Portafolio";

export class Home extends EntidadAuditable {
 user: UserHome | null;
  experiences: Experience[]; // Deberías crear una clase específica para "experiencia" si necesitas tipado fuerte
  educations: Education[];  // Igualmente, una clase para "educación"
  skills: Skill[];
  services: Service[];
  categories: Category[];
  portfolios: Portafolio[];
  setting: Setting | null;        // Podrías crear una clase `Setting` con los campos esperados
  reviewers: unknown[];

  constructor() {
    super();
    this.id = null;
    this.user = null;
    this.experiences = [];
    this.educations = [];
    this.skills = [];
    this.services = [];
    this.categories = [];
    this.portfolios = [];
    this.setting = null;
    this.reviewers = [];
  }
}
