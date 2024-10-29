export interface Validador {
  /**
   * devuelve true cuando su implementacion lo decida,
   * @throws Error, cuando se desee presentar una excepcion por notificacion generica
   */
  validar(): Promise<boolean>
}
