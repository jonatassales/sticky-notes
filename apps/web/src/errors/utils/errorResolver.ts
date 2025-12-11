import { ContextError } from "../enum/ContextError";
import { InterfaceError } from "../InterfaceError";

interface ErrorResolverResult {
  message: string;
}

export function errorResolver(error: InterfaceError): ErrorResolverResult {
  return {
    [ContextError.StickyNotesProviderError]: {
      message: "No sticky notes context was returned.",
    },
  }[error];
}
