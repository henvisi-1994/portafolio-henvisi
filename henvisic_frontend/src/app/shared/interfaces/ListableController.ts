/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponseGet } from "./HttpResponseGet";
import { HttpResponseList } from "./HttpResponseList";
import { ResponseItem } from "./ResponseItem";

export interface ListableController<T> {
  listar<C = T>(
    params?: any
  ): Promise<ResponseItem<C[], HttpResponseGet<HttpResponseList<C>>>>
}
