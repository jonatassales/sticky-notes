import { ContextError } from "../enum/ContextError";
import { InterfaceError } from "../InterfaceError";

interface ErrorResolverResult {
  message: string;
}

export function errorResolver(error: InterfaceError): ErrorResolverResult {
  return {
    [ContextError.CanvasEventRegistryError]: {
      message: "No Canvas event registry was returned",
    },
  }[error];
}
