import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class UserHome extends EntidadAuditable {
name: string | null;
email: string | null;
phone: string | null;
address: string | null;
job: string | null;
degree: string | null;
profilePic: string | null;
birth_day: Date | string | null;
experience: number | null;

constructor() {
  super();
  this.name = null;
  this.email = null;
  this.phone = null;
  this.address = null;
  this.job = null;
  this.degree = null;
  this.profilePic = null;
  this.birth_day = null;
  this.experience = null;
}
}
