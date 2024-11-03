import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class Review extends EntidadAuditable {
  description: string|null
  name: string|null
  image: string | null
  job: string|null
  constructor() {
    super();
    this.description = null;
    this.name = null;
    this.image = null;
    this.job = null;
  }
}
