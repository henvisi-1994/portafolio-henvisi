import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class UserHome extends EntidadAuditable {
name: string | null;
email: string | null;
phone: string | null;
address: string | null;
job: string | null;
degree: string | null;
profilePic: string | null;
birthDay: Date | null;
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
  this.birthDay = null;
  this.experience = null;
}
}
