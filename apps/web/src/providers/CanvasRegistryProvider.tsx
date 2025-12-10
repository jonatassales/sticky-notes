import { ReactNode, createContext, useEffect, useRef, useState } from "react";

import { Note } from "@repo/contracts";
import {
  createStickyNotesListener,
  createCurrentStickyNoteListener,
} from "@web/events/listeners";

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

  const mouseUpHandler = () => {
    const prev = currentStickyNoteRef.current;
    if (prev) {
      setCurrentStickyNote({ ...prev, state: prev.state });
    }
  };

  const stickyListener = () =>
    createStickyNotesListener({
      stickyNotesRef,
      setStickyNotes,
    });

  const currentStickyListener = () =>
    createCurrentStickyNoteListener({
      stickyNotesRef,
      setCurrentStickyNote,
    });

  useEffect(() => {
    const stickyHandler = stickyListener();
    const currentHandler = currentStickyListener();

    document.addEventListener("mousedown", stickyHandler);
    document.addEventListener("mousedown", currentHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    return () => {
      document.removeEventListener("mousedown", stickyHandler);
      document.removeEventListener("mousedown", currentHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [stickyListener, currentStickyListener, mouseUpHandler]);

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
