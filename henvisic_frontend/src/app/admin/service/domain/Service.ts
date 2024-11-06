import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class Service extends EntidadAuditable {
  name: string | null;
  description: string | null;
  icon: string | null;
  constructor() {
    super();
    this.name = null;
    this.description = null;
    this.icon = null;
  }
}
