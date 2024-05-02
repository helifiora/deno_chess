import AppBoardCell from "@/ui/AppBoardCell.tsx";
import AppBoardCellText from "@/ui/AppBoardCellText.tsx";

export default function AppBoard() {
  return (
    <div className="board-grid">
      <AppBoardCellText text="8" type="row" />
      <AppBoardCell cell="a8" />
      <AppBoardCell cell="b8" />
      <AppBoardCell cell="c8" />
      <AppBoardCell cell="d8" />
      <AppBoardCell cell="e8" />
      <AppBoardCell cell="f8" />
      <AppBoardCell cell="g8" />
      <AppBoardCell cell="h8" />

      <AppBoardCellText text="7" type="row" />
      <AppBoardCell cell="a7" />
      <AppBoardCell cell="b7" />
      <AppBoardCell cell="c7" />
      <AppBoardCell cell="d7" />
      <AppBoardCell cell="e7" />
      <AppBoardCell cell="f7" />
      <AppBoardCell cell="g7" />
      <AppBoardCell cell="h7" />

      <AppBoardCellText text="6" type="row" />
      <AppBoardCell cell="a6" />
      <AppBoardCell cell="b6" />
      <AppBoardCell cell="c6" />
      <AppBoardCell cell="d6" />
      <AppBoardCell cell="e6" />
      <AppBoardCell cell="f6" />
      <AppBoardCell cell="g6" />
      <AppBoardCell cell="h6" />

      <AppBoardCellText text="5" type="row" />
      <AppBoardCell cell="a5" />
      <AppBoardCell cell="b5" />
      <AppBoardCell cell="c5" />
      <AppBoardCell cell="d5" />
      <AppBoardCell cell="e5" />
      <AppBoardCell cell="f5" />
      <AppBoardCell cell="g5" />
      <AppBoardCell cell="h5" />

      <AppBoardCellText text="4" type="row" />
      <AppBoardCell cell="a4" />
      <AppBoardCell cell="b4" />
      <AppBoardCell cell="c4" />
      <AppBoardCell cell="d4" />
      <AppBoardCell cell="e4" />
      <AppBoardCell cell="f4" />
      <AppBoardCell cell="g4" />
      <AppBoardCell cell="h4" />

      <AppBoardCellText text="3" type="row" />
      <AppBoardCell cell="a3" />
      <AppBoardCell cell="b3" />
      <AppBoardCell cell="c3" />
      <AppBoardCell cell="d3" />
      <AppBoardCell cell="e3" />
      <AppBoardCell cell="f3" />
      <AppBoardCell cell="g3" />
      <AppBoardCell cell="h3" />

      <AppBoardCellText text="2" type="row" />
      <AppBoardCell cell="a2" />
      <AppBoardCell cell="b2" />
      <AppBoardCell cell="c2" />
      <AppBoardCell cell="d2" />
      <AppBoardCell cell="e2" />
      <AppBoardCell cell="f2" />
      <AppBoardCell cell="g2" />
      <AppBoardCell cell="h2" />

      <AppBoardCellText text="1" type="row" />
      <AppBoardCell cell="a1" />
      <AppBoardCell cell="b1" />
      <AppBoardCell cell="c1" />
      <AppBoardCell cell="d1" />
      <AppBoardCell cell="e1" />
      <AppBoardCell cell="f1" />
      <AppBoardCell cell="g1" />
      <AppBoardCell cell="h1" />

      <span></span>

      <AppBoardCellText text="a" type="column" />
      <AppBoardCellText text="b" type="column" />
      <AppBoardCellText text="c" type="column" />
      <AppBoardCellText text="d" type="column" />
      <AppBoardCellText text="e" type="column" />
      <AppBoardCellText text="f" type="column" />
      <AppBoardCellText text="g" type="column" />
      <AppBoardCellText text="h" type="column" />
    </div>
  );
}
