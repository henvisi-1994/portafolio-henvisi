import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class Skill extends EntidadAuditable {

  name: string | null;
  percent: number | null;
  color: string | null;
  constructor() {
    super();
    this.name = null;
    this.percent = null;
    this.color = null;
  }
}
