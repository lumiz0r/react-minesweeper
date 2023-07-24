// eslint-disable-next-line react/prop-types
function Cell({ onClick, value }) {
  const getClassName = () => {
    return `cell ${typeof value === 'number' || value === 'B_clicked' ? 'clicked' : ''}`;
  };

  const getContent = () => {
    return typeof value === 'number' ? value : (value === 'B_clicked' ? '💣' : '');
  };

  return (
    <div 
      onClick={onClick} 
      className={getClassName()}
    >
      {getContent()}
    </div>
  );
}

export default Cell;
