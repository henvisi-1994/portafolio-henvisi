import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";
import { UserHome } from "./UserHome";

export class Home extends EntidadAuditable {
 user: UserHome | null;
  experiences: unknown[]; // Deberías crear una clase específica para "experiencia" si necesitas tipado fuerte
  educations: unknown[];  // Igualmente, una clase para "educación"
  skills: unknown[];
  services: unknown[];
  categories: unknown[];
  portfolios: unknown[];
  setting: unknown;        // Podrías crear una clase `Setting` con los campos esperados
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
