// @deno-types="@types/react"
import { createContext, type PropsWithChildren } from "react";
import { AppState, AppStore, createStore } from "@/ui/store.ts";

export const AppStoreContext = createContext<AppStore>({} as any);

type Props = PropsWithChildren & { initial: AppState };

export default function AppStoreProvider(props: Props) {
  const store = createStore(props.initial);
  return (
    <AppStoreContext.Provider value={store}>
      {props.children}
    </AppStoreContext.Provider>
  );
}
