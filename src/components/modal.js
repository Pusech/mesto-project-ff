function openModal(element) {
  element.classList.add("popup_is-animated");
  element.classList.add("popup_is-opened");
  escapeListener();
}

function closeModal(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    evt.target.closest(".popup").classList.remove("popup_is-opened");
  }
}

function escClose(evt) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
    evt.target.removeEventListener("keydown", escClose);
  }
}

function escapeListener() {
  document.addEventListener("keydown", escClose);
}

export { openModal, closeModal, escClose };
