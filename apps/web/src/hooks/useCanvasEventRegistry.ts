import { useContext } from "react";
import { CanvasEventRegistryContext } from "@web/providers";

export function useCanvasEventRegistry() {
  const context = useContext(CanvasEventRegistryContext);

  if (!context) {
    throw new Error("TODO: map error messages");
  }

  return context;
}
