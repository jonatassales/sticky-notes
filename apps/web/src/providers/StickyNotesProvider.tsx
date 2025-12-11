import { ReactNode, createContext, useState } from "react";
import { Note } from "@repo/contracts";

interface StickyNotesProviderProps {
  children: ReactNode;
}

interface StickyNotesProviderValue {
  stickyNotes: Note[];
  setStickyNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export const StickyNotesContext =
  createContext<StickyNotesProviderValue | null>(null);

export function StickyNotesProvider({ children }: StickyNotesProviderProps) {
  const [stickyNotes, setStickyNotes] = useState<Note[]>([]);

  return (
    <StickyNotesContext.Provider
      value={{
        stickyNotes,
        setStickyNotes,
      }}
    >
      {children}
    </StickyNotesContext.Provider>
  );
}
