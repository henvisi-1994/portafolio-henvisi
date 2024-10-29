// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Hidratable<T extends Record<string, any> = any> {
  hydrate(data: Partial<T>): this {
    const defValues = new (this.constructor as { new (): T })();

    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        const value = (this as unknown as T)[key];

        if ((value as unknown) instanceof Hidratable) {
          if (data[key as keyof T]) {
            value.hydrate(data[key as keyof T]);
          }
        } else if (Object.prototype.hasOwnProperty.call(data, key)) {
          (this as unknown as T)[key] = data[key as keyof T] as T[typeof key];
        } else {
          (this as unknown as T)[key] = (defValues as unknown as T)[key];
        }
      }
    }

    return this;
  }

  createCopy(): this {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const copy = new (this.constructor as any)();
    copy.hydrate(this);
    return copy;
  }
}
