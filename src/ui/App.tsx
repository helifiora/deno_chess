import type { AppState } from "@/ui/store.ts";
import AppBoard from "@/ui/AppBoard.tsx";
import AppStoreProvider from "@/ui/AppStoreProvider.tsx";
import AppInfo from "@/ui/AppInfo.tsx";
import { createGame } from "@/application/usecase/create_game.ts";

const initial: AppState = {
  ...createGame().data,
  highlight: new Set(),
  isCheck: null,
  isCheckmate: false,
  origin: null,
};

export default function App() {
  return (
    <AppStoreProvider initial={initial}>
      <AppBoard />
      <AppInfo />
    </AppStoreProvider>
  );
}
