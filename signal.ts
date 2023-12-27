import { isSame } from "./object_helpers.ts";

type Consumer<T> = (value: T, old?: T) => void;

export class Signal<T> {
  #value: T;
  #listeners: Consumer<T>[];

  constructor(value: T) {
    this.#value = value;
    this.#listeners = [];
  }

  set value(newValue: T) {
    if (!isSame(newValue, this.#value)) {
      const old = this.#value;
      this.#value = newValue;
      this.notify(old);
    }
  }

  get value(): T {
    return this.#value;
  }

  subscribe(consumer: Consumer<T>): void {
    this.#listeners.push(consumer);
  }

  notify(old?: T): void {
    for (const item of this.#listeners) {
      item(this.#value, old);
    }
  }
}
