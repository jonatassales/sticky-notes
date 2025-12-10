import { useEffect, useRef } from "react";
import { SquareArrowDownRight, Grip } from "lucide-react";
import { cn } from "@repo/react/utils";
import { Note, NoteState } from "@repo/contracts";
import { Card, CardProps, IconButton } from "@repo/ds/ui";

import "./StickyNote.css";
import { useCanvasEventRegistry } from "@web/hooks";

interface StickyNoteProps extends CardProps {
  noteId: Note["id"];
}

export function StickyNote(props: StickyNoteProps) {
  const { noteId, ...rest } = props;
  const { stickyNotes, setStickyNotes } = useCanvasEventRegistry();

  const noteRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);
  const resizeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.stopPropagation();
    };

    const handleOnResizeHandler = () => {
      const updatedStickyNotes = stickyNotes.map((stickyNote) => {
        if (stickyNote.id === noteId) {
          return {
            ...stickyNote,
            state: NoteState.Resizing,
          };
        }
        return stickyNote;
      });

      setStickyNotes(updatedStickyNotes);
    };

    const handleOnDrag = () => {
      const updatedStickyNotes = stickyNotes.map((stickyNote) => {
        if (stickyNote.id === noteId) {
          return {
            ...stickyNote,
            state: NoteState.Dragging,
          };
        }
        return stickyNote;
      });

      setStickyNotes(updatedStickyNotes);
    };

    noteRef.current?.addEventListener("mousedown", handleMouseDown);
    resizeRef.current?.addEventListener("mousedown", handleOnResizeHandler);
    dragRef.current?.addEventListener("mousedown", handleOnDrag);

    return () => {
      noteRef.current?.addEventListener("mousedown", handleMouseDown);
      resizeRef.current?.removeEventListener(
        "mousedown",
        handleOnResizeHandler
      );
      dragRef.current?.removeEventListener("mousedown", handleOnDrag);
    };
  }, []);

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
      ref={noteRef}
      className={cn("sticky-note", {
        ["sticky-note--dragging"]: true,
      })}
      {...rest}
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
        id={noteId}
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
