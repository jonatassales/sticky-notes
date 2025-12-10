import { memo, useEffect, useRef } from "react";
import { Shredder } from "lucide-react";
import { IconButton } from "@repo/ds/ui";

import "./TrashZone.css";

export const TrashZone = memo(function TrashZone() {
  const trashZoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trashZoneRef.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      trashZoneRef.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const handleMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="tz-root" ref={trashZoneRef}>
      <IconButton>
        <Shredder color="red" size={80} />
      </IconButton>
    </div>
  );
});
