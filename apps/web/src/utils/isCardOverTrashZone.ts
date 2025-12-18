export const isCardOverTrashZone = (cardElement: HTMLDivElement) => {
  const trashZoneElement = document.querySelector(".trash-zone");

  if (!trashZoneElement) return false;

  const trashRect = trashZoneElement.getBoundingClientRect();
  const cardRect = cardElement.getBoundingClientRect();

  return (
    cardRect.left < trashRect.right &&
    cardRect.right > trashRect.left &&
    cardRect.top < trashRect.bottom &&
    cardRect.bottom > trashRect.top
  );
};
