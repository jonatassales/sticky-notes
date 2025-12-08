import { signal } from "@preact/signals-react";
import { Note } from "@repo/contracts";

export const currentStickyNote = signal<Note | null>(null);
