import { User } from "./User.interface";

export interface AuthResponse {
  mensaje: string;
  access_token: string;
  token_type: string;
  modelo: User;
}


