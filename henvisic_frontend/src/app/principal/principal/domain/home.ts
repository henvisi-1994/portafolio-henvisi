import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Setting } from "../../../admin/Setting/domain/Setting";
import { UserHome } from "../../../admin/AboutMe/domain/UserHome";
import { Service } from "../../../admin/service/domain/Service";
import { Review } from "./Review";
import { Category } from "../../../admin/category/domain/Category";
import { Skill } from "../../../admin/skill/domain/Skill";
import { Portafolio } from "../../../admin/portafolio/domain/Portafolio";

export class Home extends EntidadAuditable {
 user: UserHome | null;
  experiences: Experience[]; // Deberías crear una clase específica para "experiencia" si necesitas tipado fuerte
  educations: Education[];  // Igualmente, una clase para "educación"
  skills: Skill[];
  services: Service[];
  categories: Category[];
  portfolios: Portafolio[];
  setting: Setting | null;        // Podrías crear una clase `Setting` con los campos esperados
  reviewers: Review[];

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
