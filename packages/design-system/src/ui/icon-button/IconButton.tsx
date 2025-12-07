import React, { forwardRef } from "react";
import { cn } from "@repo/react/utils";

import "./IconButton.css";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <button ref={ref} className={cn("ds-icon-button", className)} {...rest}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
