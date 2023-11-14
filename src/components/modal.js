function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", escClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escClose);
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function escClose(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
  }
}

export { openModal, closeModal, escClose, closeByOverlay };
