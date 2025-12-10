import { useEffect } from "react";
import { useCanvasEventRegistry } from "@web/hooks";

import { Canvas } from "./Canvas";
import { NoteState } from "@repo/contracts";

export function CanvasContainer() {
  const { currentStickyNote, stickyNotes, setCurrentStickyNote } =
    useCanvasEventRegistry();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (currentStickyNote?.state === NoteState.Dragging) {
        console.log("Dragging");
        setCurrentStickyNote({
          ...currentStickyNote,
          position: { x: event.x, y: event.y },
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentStickyNote?.state]);

  return (
    <Canvas stickyNotes={stickyNotes} currentStickyNote={currentStickyNote} />
  );
}
