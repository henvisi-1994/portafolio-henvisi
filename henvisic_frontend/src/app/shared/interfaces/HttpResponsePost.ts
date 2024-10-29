/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponsePost<T> {
  mensaje?: string; // The
  response: any; // Placeholder for the raw HTTP response object
  modelo: T; // The saved entity
  data?: any; //
}
