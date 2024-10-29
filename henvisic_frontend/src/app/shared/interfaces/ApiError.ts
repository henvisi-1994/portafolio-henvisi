import { HttpErrorResponse } from "@angular/common/http";

export class ApiError {
status: number;
message: string;
  erroresValidacion!: string[];
constructor(error: HttpErrorResponse) {
  this.status = error.status;
  this.message = error.message;
}
}
