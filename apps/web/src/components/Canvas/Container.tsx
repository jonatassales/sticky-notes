import { useCanvasEventRegistry } from "./hooks";
import { Canvas } from "./Canvas";

export function Container() {
  useCanvasEventRegistry();

  return <Canvas />;
}
