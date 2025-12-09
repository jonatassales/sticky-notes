import { memo } from "react";
import { Card, CardProps } from "@repo/ds/ui";
import { stickyNotes } from "@web/atoms";

import { NoteController } from "./NoteController";
import "./StickyNote.css";

export const StickyNote = memo(function StickyNote(props: CardProps) {
  const hanndleOnBlur = () => {
    console.log("Updates stickyNotes: ", stickyNotes.value);
  };

  return (
    <Card className="sn-root" {...props}>
      <NoteController />
      <input
        className="sn-text"
        onBlur={hanndleOnBlur}
        placeholder="Enter your note here"
      />
    </Card>
  );
});
