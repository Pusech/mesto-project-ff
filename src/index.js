const cardList = document.querySelector(".places__list");

const newCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");

const addBtn = document.querySelector(".profile__add-button");
const editBtn = document.querySelector(".profile__edit-button");
const popupWindows = document.querySelectorAll(".popup");

import "./pages/index.css";
import initialCards from "./components/cards";
import { createCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard, openModal));
});

//открытие окна

addBtn.addEventListener("click", function () {
  openModal(newCardPopup);
});

editBtn.addEventListener("click", function () {
  openModal(editPopup);
});

//кнопки закрытия

popupWindows.forEach((el) => {
  el.addEventListener("click", closeModal);
});

//4.сабмит редактирования профиля

// Находим форму в DOM
const formElement = document.querySelector(".popup_type_edit");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector(".profile__title");
  const profileDesc = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDesc.textContent = jobValue;

  evt.target.reset();

  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

// 6. сабмит новой карточки

const formNewCardElement = document.querySelector(".popup_type_new-card");
const cardNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

function handleAddCard(evt) {
  evt.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  initialCards.unshift(newCardData);
  cardList.prepend(createCard(newCardData, deleteCard, openModal));
  evt.target.reset();

  const openedPopup = document.querySelector(".popup_is-opened");
  openedPopup.classList.remove("popup_is-opened");
}

formNewCardElement.addEventListener("submit", handleAddCard);
