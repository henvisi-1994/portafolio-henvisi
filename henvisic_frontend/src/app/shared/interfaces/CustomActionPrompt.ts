/* eslint-disable @typescript-eslint/no-explicit-any */
type funcion = (param:any) => void

export interface CustomActionPrompt {
  titulo?: string,
  mensaje: string
  accion: (param:any) => void
  defecto?: string | number | null
  tipo?: string
  validacion?: funcion
  items?: any[]
  requerido?: boolean
}
