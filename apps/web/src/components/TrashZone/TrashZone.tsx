import { Shredder } from "lucide-react";
import { IconButton } from "@repo/ds/ui";

import "./TrashZone.css";

export function TrashZone() {
  return (
    <div className="trash-zone">
      <IconButton>
        <Shredder color="red" size={48} />
      </IconButton>
    </div>
  );
}
