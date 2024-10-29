export interface HttpResponsePut<T> {
  mensaje: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any; // Placeholder for the raw HTTP response object
  result: T[]; // The updated list of entities
}
