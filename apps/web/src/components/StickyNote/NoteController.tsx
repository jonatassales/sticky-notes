import { Scaling, Grip } from "lucide-react";
import { IconButton } from "@repo/ds/ui";
import { NoteState } from "@repo/contracts";
// import { updateCurrentStickyNote } from "@web/actions";

import "./StickyNote.css";
import { useEffect, useRef } from "react";

export function NoteController() {
  const dragRef = useRef<HTMLButtonElement>(null);
  const resizeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dragRef.current?.addEventListener("mousedown", handleOnDrag);
    resizeRef.current?.addEventListener("mousedown", handleOnResize);

    return () => {
      dragRef.current?.removeEventListener("mousedown", handleOnDrag);
      resizeRef.current?.removeEventListener("mousedown", handleOnResize);
    };
  }, []);

  const handleOnResize = (event: MouseEvent) => {
    event.stopPropagation();
    // updateCurrentStickyNote({
    //   state: NoteState.Resizing,
    // });
  };

  const handleOnDrag = (event: MouseEvent) => {
    event.stopPropagation();
    // updateCurrentStickyNote({
    //   state: NoteState.Dragging,
    // });
  };

  return (
    <nav className="nc-root">
      <IconButton
        className="nc-grab"
        aria-label="Sticky note grab button"
        aria-description="Left click and hold to move the sticky note around."
      >
        <Grip size={20} />
      </IconButton>
      <IconButton
        className="nc-resize"
        aria-label="Sticky note resize button"
        aria-description="Left click and hold to resize the sticky note."
      >
        <Scaling size={20} />
      </IconButton>
    </nav>
  );
}
