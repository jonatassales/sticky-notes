import { useEffect, useRef } from "react";
import { SquareArrowDownRight, Grip } from "lucide-react";
import { Note } from "@repo/contracts";
import { Card, CardProps, IconButton } from "@repo/ds/ui";

import "./StickyNote.css";

interface StickyNoteProps extends CardProps {
  noteId: Note["id"];
}

export function StickyNote(props: StickyNoteProps) {
  const { noteId, ...rest } = props;

  const noteRef = useRef<HTMLDivElement>(null);
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
    <Card className="sticky-note" {...rest} ref={noteRef}>
      <IconButton
        className="sticky-note__header"
        aria-label="Sticky note grab button"
        aria-description="Left click and hold to move the sticky note around."
      >
        <Grip size={20} className="sticky-note__header__grab-icon" />
      </IconButton>
      <input
        id={noteId}
        name="sticky-note-content"
        className="sticky-note__text"
        onBlur={hanndleOnBlur}
        placeholder="Enter your note here"
      />
      <IconButton
        className="sticky-note__footer"
        aria-label="Sticky note resize button"
        aria-description="Left click and hold to resize the sticky note."
      >
        <SquareArrowDownRight
          size={20}
          className="sticky-note__footer__resize-icon"
        />
      </IconButton>
    </Card>
  );
}
