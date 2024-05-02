type Props = {
  text: string;
  type: "row" | "column";
};

export default function AppBoardCellText(props: Props) {
  return <p className={props.type}>{props.text}</p>;
}
