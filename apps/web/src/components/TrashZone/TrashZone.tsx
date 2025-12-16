import { Shredder } from "lucide-react";
import { IconButton } from "@repo/ds/ui";
import { Default, trashZoneStyleFactory } from "@web/factory";

import { useTrashZoneEventRegistry } from "./hooks";
import "./TrashZone.css";

export const TrashZone = function TrashZone() {
  const { trashZoneRef } = useTrashZoneEventRegistry();

  return (
    <div
      ref={trashZoneRef}
      className="trash-zone"
      style={trashZoneStyleFactory()}
    >
      <IconButton>
        <Shredder
          className="trash-zone__icon"
          size={Default.TrashZoneIconSize}
        />
      </IconButton>
    </div>
  );
};
