import { EntidadAuditable } from "../domain/EntidadAuditable";

export interface Model<T extends EntidadAuditable> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: T;
  action: string
}
