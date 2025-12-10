import { memo, useEffect, useRef } from "react";
import { Card, CardProps } from "@repo/ds/ui";
import { Note } from "@repo/contracts";

import { NoteController } from "./NoteController";
import "./StickyNote.css";

export function StickyNote(props: CardProps) {
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    noteRef.current?.addEventListener("mousedown", handleMouseDown);

    return () =>
      noteRef.current?.addEventListener("mousedown", handleMouseDown);
  }, []);

  const handleMouseDown = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const hanndleOnBlur = () => {
    console.log("Updates stickyNotes: ");
  };

  return (
    <Card className="sn-root" {...props} ref={noteRef}>
      <NoteController />
      <input
        className="sn-text"
        onBlur={hanndleOnBlur}
        placeholder="Enter your note here"
      />
    </Card>
  );
}
