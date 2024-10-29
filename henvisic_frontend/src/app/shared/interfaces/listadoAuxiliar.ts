/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListableController } from "./ListableController";

export type ListadoAuxiliar<T> = {
  [key: string]: ListableController<T> | {
    controller: ListableController<T>,
    params: Record<string, any>
  }
};
