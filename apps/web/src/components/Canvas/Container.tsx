import { useCanvasEventRegistry } from "@web/hooks";

import { Canvas } from "./Canvas";

export function Container() {
  const { stickyNotes } = useCanvasEventRegistry();

  return <Canvas stickyNotes={stickyNotes} />;
}
