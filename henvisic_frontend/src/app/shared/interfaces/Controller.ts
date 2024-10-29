/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponseDelete } from "./HttpResponseDelete"
import { HttpResponseGet } from "./HttpResponseGet"
import { HttpResponsePost } from "./HttpResponsePost"
import { HttpResponsePut } from "./HttpResponsePut"
import { ListableController } from "./ListableController"
import { ParamsType } from "./ParamsType"
import { ResponseItem } from "./ResponseItem"

export interface Controller<T> extends ListableController<T> {
  consultar(
    id: number | null,
    params?: any
  ): Promise<ResponseItem<T, HttpResponseGet<T>>>

  guardar(item: T, params?: ParamsType): Promise<ResponseItem<T, HttpResponsePost<T>>>

  editar(item: T, params?: any): Promise<ResponseItem<T, HttpResponsePut<T>>>

  eliminar(
    id: number | null,
    params?: any
  ): Promise<ResponseItem<T, HttpResponseDelete<T>>>
}
