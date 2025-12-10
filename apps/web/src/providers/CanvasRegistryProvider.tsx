import { ReactNode, createContext, useEffect, useState } from "react";
import { Note, NoteState } from "@repo/contracts";
import {
  createStickyNotesListener,
  createCurrentStickyNoteListener,
} from "@web/events/listeners";

interface CanvasRestryProviderProps {
  children: ReactNode;
}

interface CanvasRestryProviderValue {
  stickyNotes: Note[];
  currentStickyNote: Note | null;
}

export const CanvasEventRegistryContext =
  createContext<CanvasRestryProviderValue | null>(null);

export function CanvasRegistryProvider({
  children,
}: CanvasRestryProviderProps) {
  const [stickyNotes, setStickyNotes] = useState<Note[]>([]);
  const [currentStickyNote, setCurrentStickyNote] = useState<Note | null>(null);

  useEffect(() => {
    // TODO: Improve this section
    const mouseUpHandler = (event: MouseEvent) => {
      if (currentStickyNote?.id) {
        setCurrentStickyNote({
          ...currentStickyNote,
          state: NoteState.Stale,
        });
      }
    };

    const stickyNotesHandler = createStickyNotesListener({ setStickyNotes });
    const currentStickyNoteHandler = createCurrentStickyNoteListener({
      setCurrentStickyNote,
      stickyNotes,
    });
    document.addEventListener("mousedown", stickyNotesHandler);
    document.addEventListener("mousedown", currentStickyNoteHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    return () => {
      document.removeEventListener("mousedown", stickyNotesHandler);
      document.removeEventListener("mousedown", currentStickyNoteHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  return (
    <CanvasEventRegistryContext.Provider
      value={{
        stickyNotes,
        currentStickyNote,
      }}
    >
      {children}
    </CanvasEventRegistryContext.Provider>
  );
}
