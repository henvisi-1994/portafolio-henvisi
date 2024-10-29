export interface HttpResponseDelete<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any; // Placeholder for the raw HTTP response object
  result: T; // Assuming the "mensaje" property holds the deletion message
}
