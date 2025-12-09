import { memo } from "react";
import { Shredder } from "lucide-react";
import { IconButton } from "@repo/ds/ui";

import "./TrashZone.css";

export const TrashZone = memo(function TrashZone() {
  return (
    <div className="tz-root">
      <IconButton>
        <Shredder color="red" size={80} />
      </IconButton>
    </div>
  );
});
