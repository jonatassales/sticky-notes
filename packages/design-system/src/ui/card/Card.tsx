import React, { forwardRef } from "react";
import { cn } from "@repo/react/utils";

import "./Card.css";

export type CardProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div ref={ref} className={cn("ds-card", className)} {...rest}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
