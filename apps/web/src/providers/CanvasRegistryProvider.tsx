import { ReactNode, createContext, useEffect, useRef, useState } from "react";

import { Note, NoteState } from "@repo/contracts";
import {
  createStickyNotesListener,
  createCurrentStickyNoteListener,
} from "@web/events/listeners";
import { noteFactory } from "@web/factory";

interface CanvasRegistryProviderProps {
  children: ReactNode;
}

interface CanvasRegistryProviderValue {
  stickyNotes: Note[];
  currentStickyNote: Note | null;
  setStickyNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  setCurrentStickyNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const CanvasEventRegistryContext =
  createContext<CanvasRegistryProviderValue | null>(null);

export function CanvasRegistryProvider({
  children,
}: CanvasRegistryProviderProps) {
  const [stickyNotes, setStickyNotes] = useState<Note[]>([]);
  const [currentStickyNote, setCurrentStickyNote] = useState<Note | null>(null);
  const stickyNotesRef = useRef<Note[]>([]);
  const currentStickyNoteRef = useRef<Note | null>(null);

  useEffect(() => {
    stickyNotesRef.current = stickyNotes;
  }, [stickyNotes]);

  useEffect(() => {
    currentStickyNoteRef.current = currentStickyNote;
  }, [currentStickyNote]);

  const mouseUpHandler = (event: MouseEvent) => {
    if (currentStickyNoteRef.current?.id) {
      setCurrentStickyNote({
        ...currentStickyNoteRef.current,
        state: NoteState.Stale,
        position: {
          x: event.x,
          y: event.y,
        },
      });
    }
  };

  // const stickyListener = () =>
  //   createStickyNotesListener({
  //     stickyNotesRef,
  //     setStickyNotes,
  //   });

  // const currentStickyListener = () =>
  //   createCurrentStickyNoteListener({
  //     stickyNotesRef,
  //     setCurrentStickyNote,
  //   });

  useEffect(() => {
    // const stickyHandler = stickyListener();

    const onCreateStickNoteHandler = (event: MouseEvent) => {
      const position = { x: event.x, y: event.y };
      const prevNotes = stickyNotesRef.current;
      const newNote = noteFactory({ prevNotes, position });

      setCurrentStickyNote(newNote);

      if (currentStickyNote?.id) {
        setStickyNotes([...stickyNotes, currentStickyNote]);
      }
    };

    document.addEventListener("mousedown", onCreateStickNoteHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    return () => {
      document.removeEventListener("mousedown", onCreateStickNoteHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  return (
    <CanvasEventRegistryContext.Provider
      value={{
        stickyNotes,
        currentStickyNote,
        setStickyNotes,
        setCurrentStickyNote,
      }}
    >
      {children}
    </CanvasEventRegistryContext.Provider>
  );
}
