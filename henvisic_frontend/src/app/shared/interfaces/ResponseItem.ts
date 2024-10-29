export interface ResponseItem<T, R> {
  response: R; // The raw HTTP response object
  result: T; // The saved entity
  message?: string; // The
}

