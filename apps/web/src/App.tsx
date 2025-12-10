import { CanvasContainer } from "@web/components";
import { CanvasRegistryProvider } from "@web/providers";

export const App = () => (
  <CanvasRegistryProvider>
    <CanvasContainer />
  </CanvasRegistryProvider>
);
