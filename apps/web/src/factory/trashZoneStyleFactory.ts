import { type CSSProperties } from "react";

import { Default } from "./enum/Default";

export function trashZoneStyleFactory() {
  return {
    "--trash-zone-size": `${Default.TrashZoneBoundaryAxys}px`,
  } as CSSProperties;
}
