import { Canvas } from "./components";
import { CanvasRegistryProvider } from "./providers";

export const App = () => (
  <CanvasRegistryProvider>
    <Canvas />
  </CanvasRegistryProvider>
);
