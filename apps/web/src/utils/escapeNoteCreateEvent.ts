export function escapeNoteCreateEvent(
  event: React.MouseEvent<HTMLDivElement>
): boolean {
  // @ts-ignore
  const name = event.target.className;
  return name !== "cv-root" && name !== "tz-zone";
}
