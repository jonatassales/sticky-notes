import React, { forwardRef } from "react";
import { cn } from "@repo/react/utils";

import "./Skeleton.css";

export type SkeletonProps = React.ButtonHTMLAttributes<HTMLDivElement>;

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <div ref={ref} className={cn("ds-skeleton", className)} {...rest}>
        {children}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";
