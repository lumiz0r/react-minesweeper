// eslint-disable-next-line react/prop-types
export const Cell = ({ onClick, disabled }) => {
    
  return (
    <td
      onClick={onClick}
      style={{ backgroundColor: disabled ? "#333" : "#000" }} // Customize the darkened style
    >
      {/* display cell value here */}
    </td>
  );
};
