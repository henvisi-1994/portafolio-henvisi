export interface HttpResponseGet<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  response: unknown; // Placeholder for the raw HTTP response object
  result: T[]; // Array to hold the list of results
}
