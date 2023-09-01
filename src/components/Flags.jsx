// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line react/prop-types
const Flags = ({ flagged, initialBombs }) => {
  const flagsUsed = Object.values(flagged).filter(Boolean).length;
  const flagsRemaining = initialBombs - flagsUsed;

  return <div className="float-left  font-bold text-white mb-5 mr-96 inline-block px-5 py-2.5 border-none bg-zinc-700 text-white text-base text-center no-underline">Flags: {flagsRemaining}</div>;
};

export default Flags;
