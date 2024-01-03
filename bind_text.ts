import { Signal } from "./signal.ts";
import { ViewModel } from "./view_model.ts";

export function bindText(vm: ViewModel): void {
  const m = new Map<string, Signal<any>>([
    ["current-round", vm.round],
    ["current-team", vm.turn],
    ["captured-black", vm.capturedBlack],
    ["captured-white", vm.capturedWhite],
    ["message-check", vm.check],
  ]);

  document.querySelectorAll("[data-text]").forEach(($el) => {
    const key = $el.getAttribute("data-text") ?? "";
    const signal = m.get(key) ?? null;
    if (signal !== null) {
      signal.subscribe((s) => $el.textContent = `${s}`);
    }
  });
}
