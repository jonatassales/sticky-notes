export function cancelBubblingEventListener(event: MouseEvent) {
  event.stopPropagation();
}
