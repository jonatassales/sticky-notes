import { useEffect, useRef } from "react";
import { Scaling, Grip } from "lucide-react";
import { IconButton } from "@repo/ds/ui";
import { NoteState } from "@repo/contracts";
// import { updateCurrentStickyNote } from "@web/actions";

import "./StickyNote.css";

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
    // const newPosition = { x: event.x, y: event.y };

    // if (currentStickyNote.state === NoteState.Dragging) {
    //   setStickyNotes(
    //     stickyNotes.map((note) => {
    //       if (note.id === currentStickyNote.id) {
    //         return {
    //           ...note,
    //           position: newPosition,
    //         };
    //       }

    //       return note;
    //     })
    //   );
    // }
    // updateCurrentStickyNote({
    //   state: NoteState.Dragging,
    // });
  };

  // const resizeHandler = (event: MouseEvent) => {
  //   if (currentStickyNote?.state === NoteState.Resizing) {
  //     const width = Math.max(event.x - currentStickyNote.position.x, 10);
  //     const height = Math.max(event.y - currentStickyNote.position.y, 10);

  //     const updated = { ...currentStickyNote, width, height };

  //     setCurrentStickyNote(updated);

  //     const updatedStickyNotes = stickyNotes.map((note) =>
  //       note.id === updated.id ? updated : note
  //     );

  //     setStickyNotes(updatedStickyNotes);
  //     return;
  //   }
  // };

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
