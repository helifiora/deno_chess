/// <reference lib="dom" />
import "./style.css";
import { ViewModel } from "./view_model.ts";
import { bindText } from "./bind_text.ts";
import { bindCell } from "./bind_cell.ts";

const vm = new ViewModel();

bindCell(document, vm);
bindText(document, vm);

vm.notifyAll();
