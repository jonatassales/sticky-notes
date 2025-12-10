import { useEffect, useRef } from "react";
import { SquareArrowDownRight, Grip } from "lucide-react";
import { cn } from "@repo/react/utils";
import { Note, NoteState } from "@repo/contracts";
import { Card, CardProps, IconButton } from "@repo/ds/ui";
import { useCanvasEventRegistry } from "@web/hooks";

import "./StickyNote.css";

export function StickyNote(props: CardProps) {
  const { setCurrentStickyNote, currentStickyNote } = useCanvasEventRegistry();

  const noteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const resizeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!currentStickyNote?.id) return;

    const handleMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
    };

    const handleOnResize = (event: MouseEvent) => {
      setCurrentStickyNote({
        ...currentStickyNote,
        state: NoteState.Resizing,
      });
    };

    const handleOnDrag = (event: MouseEvent) => {
      const position = { x: event.x, y: event.y };
      setCurrentStickyNote({
        ...currentStickyNote,
        state: NoteState.Dragging,
        position,
      });
    };

    noteRef.current?.addEventListener("mousedown", handleMouseDown);
    resizeRef.current?.addEventListener("mousedown", handleOnResize);
    dragRef.current?.addEventListener("mousedown", handleOnDrag);

    return () => {
      noteRef.current?.addEventListener("mousedown", handleMouseDown);
      resizeRef.current?.removeEventListener("mousedown", handleOnResize);
      dragRef.current?.removeEventListener("mousedown", handleOnDrag);
    };
  }, [currentStickyNote?.id]);

  const hanndleOnBlur = () => {
    console.log("Updates stickyNotes: ");
  };

  // const handleOnDrag = (event: MouseEvent) => {
  //   event.stopPropagation();

  //   const newPosition = { x: event.x, y: event.y };

  //   if (currentStickyNote?.state === NoteState.Dragging) {
  //     setStickyNotes(
  //       stickyNotes.map((note) => {
  //         if (note.id === currentStickyNote.id) {
  //           return {
  //             ...note,
  //             position: newPosition,
  //           };
  //         }

  //         return note;
  //       })
  //     );
  //   }

  //   setCurrentStickyNote((prev) => {
  //     const prev = noteRef.current;
  //     if (noteRef.current) {
  //       setCurrentStickyNote({ ...prev, state: prev.state });
  //     }
  //   });
  // };

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
    <Card
      id={currentStickyNote?.id}
      ref={noteRef}
      className={cn("sticky-note", {
        ["sticky-note--dragging"]: true,
      })}
      {...props}
    >
      <IconButton
        ref={dragRef}
        className="sticky-note__header"
        aria-label="Sticky note grab button"
        aria-description="Left click and hold to move the sticky note around."
      >
        <Grip size={20} className="sticky-note__header__grab-icon" />
      </IconButton>
      <input
        id={currentStickyNote?.id}
        name="sticky-note-content"
        className="sticky-note__text"
        onBlur={hanndleOnBlur}
        placeholder="Enter your note here"
      />
      <IconButton
        ref={resizeRef}
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
