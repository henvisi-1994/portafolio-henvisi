import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";
export class Education extends EntidadAuditable {
  type: string | null;
  title: string | null;
  association: string | null;
  description: string | null;
  from: Date | string | null;
  to: Date | string | null;
  constructor() {
    super();
    this.type = null;
    this.title = null;
    this.association = null;
    this.description = null;
    this.from = null;
    this.to = null;
  }
}
