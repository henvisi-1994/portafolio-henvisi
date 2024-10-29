import { EntidadAuditable } from '../../shared/domain/EntidadAuditable';

export class ZonaEducativa extends EntidadAuditable {
  nombre: string | null;
  constructor() {
    super();
    this.nombre = null;
  }
}
