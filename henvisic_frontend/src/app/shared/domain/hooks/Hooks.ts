/* eslint-disable @typescript-eslint/no-explicit-any */
export class Hooks<T> {
  bindHook(name: keyof T, callback: (...args: any[]) => any) {
    (this as any)[name] = callback
  }
}
