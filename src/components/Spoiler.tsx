import React, { useState } from "react";
import "./css/Spoiler.css";
type SpoilerSpanProps = {
  children: string;
};

export const SpoilerSpan: React.FC<SpoilerSpanProps> = ({ children }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={`spoiler ${revealed ? "revealed" : ""}`}
      onClick={() => setRevealed((prev) => !prev)}
    >
      {children}
    </span>
  );
};
