import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class Contact extends EntidadAuditable {
  name: string | null;
  email: string | null;
  subject_mail: string | null;
  content: string | null;
  constructor() {
    super();
    this.name = null;
    this.email = null;
    this.subject_mail = null;
    this.content = null;
  }
}
