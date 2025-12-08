import { Card, CardProps } from "@repo/ds/ui";
import { stickyNotes } from "@web/atoms";

import "./StickyNote.css";

export function StickyNote(props: CardProps) {
  const hanndleOnBlur = () => {
    console.log("Updates stickyNotes: ", stickyNotes.value);
  };

  return (
    <Card className="sn-root" {...props}>
      <textarea
        className="sn-text"
        onBlur={hanndleOnBlur}
        placeholder="Enter your text here"
      ></textarea>
    </Card>
  );
}
