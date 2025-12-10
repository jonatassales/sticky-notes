import { ReactNode, createContext, useEffect, useState } from "react";
import { Note } from "@repo/contracts";
import { createStickyNotesListener } from "@web/events/listeners";

interface CanvasRestryProviderProps {
  children: ReactNode;
}

interface CanvasRestryProviderValue {
  stickyNotes: Note[];
}

export const CanvasEventRegistryContext =
  createContext<CanvasRestryProviderValue | null>(null);

export function CanvasRegistryProvider({
  children,
}: CanvasRestryProviderProps) {
  const [stickyNotes, setStickyNotes] = useState<Note[]>([]);

  useEffect(() => {
    const handler = createStickyNotesListener({ setStickyNotes });
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <CanvasEventRegistryContext.Provider
      value={{
        stickyNotes,
      }}
    >
      {children}
    </CanvasEventRegistryContext.Provider>
  );
}
