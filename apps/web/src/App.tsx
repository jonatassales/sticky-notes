import { Container } from "./components/Canvas/Container";
import { CanvasRegistryProvider } from "./providers";

export const App = () => (
  <CanvasRegistryProvider>
    <Container />
  </CanvasRegistryProvider>
);
