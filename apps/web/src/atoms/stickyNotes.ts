import { signal } from "@preact/signals-react";
import { Note } from "@repo/contracts";

export const stickyNotes = signal<Note[]>([]);
