import "./pages/index.css";
import initialCards from "./components/cards";
import { createCard, deleteCard } from "./components/card";
import { openModal, closeModal, closeByOverlay } from "./components/modal";

const cardList = document.querySelector(".places__list");

const newCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_image");

const addBtn = document.querySelector(".profile__add-button");
const editBtn = document.querySelector(".profile__edit-button");
const popupWindows = document.querySelectorAll(".popup");

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const editForm = document.querySelector(".popup_type_edit");

const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const formNewCardElement = document.querySelector(".popup_type_new-card");
const cardNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

const fullImage = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard, openCardModal));
});

//открытие окна

addBtn.addEventListener("click", function () {
  openModal(newCardPopup);
});

editBtn.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;

  openModal(editPopup);
});

//кнопки закрытия

popupWindows.forEach((el) => {
  el.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(el);
    }
    closeByOverlay(evt);
  });
});

//4.сабмит редактирования профиля

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDesc.textContent = jobValue;

  closeModal(editForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener("submit", handleEditFormSubmit);

// 6. сабмит новой карточки

function handleAddCard(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardList.prepend(createCard(newCardData, deleteCard, openCardModal));
  evt.target.reset();

  closeModal(formNewCardElement);
}

formNewCardElement.addEventListener("submit", handleAddCard);

function openCardModal(cardDataLink, cardDataName) {
  fullImage.src = cardDataLink;
  imageCaption.textContent = cardDataName;
  openModal(cardPopup);
}
