import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class Category extends EntidadAuditable {
  name: string | null;
  constructor(){
    super();
    this.name = null;
  }
}
