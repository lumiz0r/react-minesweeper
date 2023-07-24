// eslint-disable-next-line react/prop-types
function Cell({ onClick, value }) {
  return (
    <div 
      onClick={onClick} 
      className={`cell ${typeof value === 'number' || value === 'B_clicked' ? 'clicked' : ''}`}
    >
      {typeof value === 'number' ? value : (value === 'B_clicked' ? '💣' : '')}
    </div>
  );
}

export default Cell