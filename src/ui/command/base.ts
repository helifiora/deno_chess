import type { AppState } from "@/ui/store.ts";

export interface BaseCommand {
  handle(state: AppState): AppState;
}
