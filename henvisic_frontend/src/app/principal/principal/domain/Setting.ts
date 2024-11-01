import { EntidadAuditable } from "../../../shared/domain/EntidadAuditable";

export class Setting extends EntidadAuditable {
  about_title: string | null;
  about_description: string | null;
  about_photo: string | null;
  fb_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  freelance_url: string | null;
  cv_url: string | null;
  video_url: string | null;
  contact_mail: string | null;

  constructor() {
    super();
    this.about_title = null;
    this.about_description = null;
    this.about_photo = null;
    this.fb_url = null;
    this.github_url = null;
    this.linkedin_url = null;
    this.freelance_url = null;
    this.cv_url = null;
    this.video_url = null;
    this.contact_mail = null;
  }
}
