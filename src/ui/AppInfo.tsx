// @deno-types="@types/react"
import { useContext } from "react";
import { AppStoreContext } from "@/ui/AppStoreProvider.tsx";
import { Team } from "@/domain/team.ts";

function toName(team: Team): string {
  return team === "black" ? "Pretas" : "Brancas";
}

export default function AppInfo() {
  const store = useContext(AppStoreContext);

  const displayTurn = toName(store.state.turn);

  let check = "";
  if (store.state.isCheckmate && store.state.isCheck) {
    check = `Checkmate - ${toName(store.state.isCheck)}`;
  } else if (store.state.isCheck) {
    check = `Check - ${toName(store.state.isCheck)}`;
  }

  return (
    <aside className="game-info">
      <h1 className="title">DENO CHESS</h1>

      <div className="content">
        <p>Rodada {store.state.round}</p>
        <p>{displayTurn}</p>
      </div>

      {check && <p className="check">{check}</p>}
    </aside>
  );
}
