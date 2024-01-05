/// <reference lib="dom" />
import "./style.css";
import { ViewModel } from "./view_model.ts";
import { bindText } from "./bind_text.ts";
import { bindCell } from "./bind_cell.ts";

const vm = new ViewModel();

bindCell(vm);

bindText({
  "current-round": vm.round,
  "current-team": vm.turn,
  "captured-black": vm.capturedBlack,
  "captured-white": vm.capturedWhite,
  "message-check": vm.check,
});

vm.notifyAll();
