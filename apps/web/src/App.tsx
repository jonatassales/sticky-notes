import { Canvas } from "@web/components";
import { StickyNotesProvider } from "@web/providers";

export const App = () => (
  <StickyNotesProvider>
    <Canvas />
  </StickyNotesProvider>
);
