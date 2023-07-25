import React from 'react';

const Flags = ({ flagged, initialBombs }) => {
  const flagsUsed = Object.values(flagged).filter(Boolean).length;
  const flagsRemaining = initialBombs - flagsUsed;

  return <div className="flags">Flags: {flagsRemaining}</div>;
};

export default Flags;
