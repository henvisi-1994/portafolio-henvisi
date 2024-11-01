import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";
import { Category } from "./Category";

export class Portafolio extends EntidadAuditable {
  title: string | null;
  image: string | null;
  project_url: string | null;
  cat_id: number | null;
  category: Category | null;
  constructor() {
    super();
    this.title = null;
    this.image = null;
    this.project_url = null;
    this.cat_id = null;
    this.category = null;
  }

}
