import { useEffect } from "react";
import { useCanvasEventRegistry } from "@web/hooks";

import { Canvas } from "./Canvas";
import { NoteState } from "@repo/contracts";

export function CanvasContainer() {
  const { currentStickyNote, stickyNotes, setCurrentStickyNote } =
    useCanvasEventRegistry();

  const positionX = currentStickyNote?.position.x;
  const positionY = currentStickyNote?.position.y;
  const currentState = currentStickyNote?.state;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!currentState || !positionX || !positionY) return;

      if (currentState === NoteState.Dragging) {
        setCurrentStickyNote({
          ...currentStickyNote,
          position: { x: event.x, y: event.y },
        });

        return;
      }

      if (currentState === NoteState.Resizing && positionX && positionY) {
        const width = Math.max(event.x - positionX, 10);
        const height = Math.max(event.y - positionY, 10);

        setCurrentStickyNote({
          ...currentStickyNote,
          width,
          height,
        });

        return;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [positionX, positionY, currentState]);

  return (
    <Canvas stickyNotes={stickyNotes} currentStickyNote={currentStickyNote} />
  );
}
