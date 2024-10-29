import { Hidratable } from "./Hidratable"

export class EntidadAuditable extends Hidratable{
  id: number | null
  created_at: string | null
  updated_at: string | null
  constructor() {
    super()
    this.id = null
    this.created_at = null
    this.updated_at = null
  }
}
