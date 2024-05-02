// @deno-types="@types/react"
import { useContext } from "react";
import type { Cell } from "@/domain/cell.ts";
import { AppStoreContext } from "@/ui/AppStoreProvider.tsx";
import AppPiece from "@/ui/AppPiece.tsx";

type Props = { cell: Cell };

export default function AppBoardCell(props: Props) {
  const store = useContext(AppStoreContext);

  const data = store.getCellContent(props.cell);

  const isOrigin = store.isOrigin(props.cell);

  const isHighlight = store.isHighlight(props.cell);

  let classes = "cell";
  if (isOrigin) {
    classes += " -origin";
  } else if (isHighlight) {
    classes += " -highlight";
  }

  return (
    <button className={classes} onClick={() => store.click(props.cell)}>
      {data && <AppPiece type={data.type} team={data.team} />}
    </button>
  );
}
