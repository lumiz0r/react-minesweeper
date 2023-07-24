// eslint-disable-next-line react/prop-types
function Cell({ onClick, value, onContextMenu, flagged, i, j }) {
  const isFlagged = flagged[`${i}-${j}`];
  const getClassName = () => {
    return `cell ${
      typeof value === "number" || value === "B_clicked" ? "clicked" : ""
    }`;
  };

  const getContent = () => {
    if (isFlagged) return "🚩";
    return typeof value === "number"
      ? value
      : value === "B_clicked"
      ? "💣"
      : "";
  };

  return (
    <div
      onClick={onClick}
      className={getClassName()}
      onContextMenu={onContextMenu}
    >
      {getContent()}
    </div>
  );
}

export default Cell;
