type Consumer<T> = (value: T) => void;

export class Signal<T> {
  #value: T;
  #listeners: Consumer<T>[];

  constructor(value: T) {
    this.#value = value;
    this.#listeners = [];
  }

  set value(newValue: T) {
    this.#value = newValue;
    this.notify();
  }

  get value(): T {
    return this.#value;
  }

  subscribe(consumer: Consumer<T>): void {
    this.#listeners.push(consumer);
  }

  notify(): void {
    for (const item of this.#listeners) {
      item(this.#value);
    }
  }
}
