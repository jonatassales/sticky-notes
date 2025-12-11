import { useContext } from "react";
import { StickyNotesContext } from "@web/providers";
import { ContextError, errorResolver } from "@web/errors";

export function useStickyNotes() {
  const context = useContext(StickyNotesContext);

  if (!context) {
    const error = errorResolver(ContextError.StickyNotesProviderError);
    throw new Error(error.message);
  }

  return context;
}
