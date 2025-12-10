import { useCanvasEventRegistry } from "@web/hooks";

import { Canvas } from "./Canvas";

export function CanvasContainer() {
  const { stickyNotes } = useCanvasEventRegistry();

  console.log("CanvasContainer");

  return <Canvas stickyNotes={stickyNotes} />;
}
