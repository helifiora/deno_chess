import { Signal } from "./signal.ts";
import { ViewModel } from "./view_model.ts";

export function bindText(dom: Document, vm: ViewModel): void {
  const m = new Map<string, Signal<any>>([
    ["current-round", vm.round],
    ["current-team", vm.turn],
    ["captured-black", vm.capturedBlack],
    ["captured-white", vm.capturedWhite],
    ["message-check", vm.check],
  ]);

  dom.querySelectorAll("[data-text]").forEach(($el) => {
    const key = $el.getAttribute("data-text") ?? "";
    const signal = m.get(key);
    if (signal) {
      signal.subscribe((s) => $el.textContent = `${s}`);
    }
  });
}
