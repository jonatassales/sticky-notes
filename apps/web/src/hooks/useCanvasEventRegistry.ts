import { useContext } from "react";
import { CanvasEventRegistryContext } from "@web/providers";
import { ContextError, errorResolver } from "@web/errors";

export function useCanvasEventRegistry() {
  const context = useContext(CanvasEventRegistryContext);

  if (!context) {
    const error = errorResolver(ContextError.CanvasEventRegistryError);
    throw new Error(error.message);
  }

  return context;
}
