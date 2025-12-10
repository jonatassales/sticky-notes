import { useEffect } from "react";
import { useCanvasEventRegistry } from "@web/hooks";

import { Canvas } from "./Canvas";
import { NoteState } from "@repo/contracts";

export function CanvasContainer() {
  const { currentStickyNote, stickyNotes } = useCanvasEventRegistry();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (
        currentStickyNote?.id &&
        (currentStickyNote.state === NoteState.Dragging ||
          currentStickyNote.state === NoteState.Resizing)
      ) {
        console.log("dragging or resizing");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentStickyNote?.id]);

  return <Canvas stickyNotes={stickyNotes} />;
}
