import React from "react";

export const LinktreeIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m13.736 5.853 4.005-4.117 2.325 2.38-4.2 4.007h5.908v3.305h-5.937l4.229 4.108-2.325 2.38-4.005-4.117v10.198h-3.472V13.8l-4.005 4.117-2.325-2.38 4.2-4.008H2.226V8.225h5.937L3.934 4.117l2.325-2.38 4.005 4.117V0h3.472v5.853z" />
  </svg>
);
