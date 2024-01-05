import type { Signal } from "./signal.ts";

const selector = "data-text";

type Mapping = Record<string, Signal<string>>;

export function bindText(mapping: Mapping): void {
  const elements = Array.from(document.querySelectorAll(`[${selector}]`));
  for (const element of elements) {
    const key = element.getAttribute(selector) ?? "";
    const signal = mapping[key] ?? null;
    if (signal !== null) {
      signal.subscribe((s) => element.textContent = s);
    }
  }
}
