import "./pages/index.css";
import { createCard, deleteCard } from "./components/card";
import { openModal, closeModal, closeByOverlay } from "./components/modal";
import { checkInputValidity, enableValidation } from "./components/validation";
import {
  updateProfile,
  changeProfileImage,
  getProfileData,
  getCardsData,
} from "./components/api";

const cardList = document.querySelector(".places__list");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_image");
const editImagePopup = document.querySelector(".popup_type_edit-image");
const profileImage = document.querySelector(".profile__image");
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
const formNewProfileImage = document.querySelector(".popup_type_profile-image");
const profileImageInput = formNewProfileImage.querySelector(
  ".popup__input_type_profile-image"
);
const fullImage = document.querySelector(".popup__image");
const imageCaption = document.querySelector(".popup__caption");

const deleteCardPopup = document.querySelector(".popup_type_delete-card");

// _______________________________________________________________________________
//открытие окна

addBtn.addEventListener("click", function () {
  openModal(newCardPopup);
});

editBtn.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
  openModal(editPopup);
});

profileImage.addEventListener("click", function () {
  openModal(formNewProfileImage);
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

  updateProfile(nameValue, jobValue);
  closeModal(editForm);
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener("submit", handleEditFormSubmit);

// 6. сабмит новой карточки

function handleAddCard(evt) {
  evt.preventDefault();

  fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
    method: "POST",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardNameInput.value, // new card name
      link: cardLinkInput.value, // new card image link
    }),
  })
    .then((res) => res.json())
    .then((newCardData) => {
      cardList.prepend(createCard(newCardData, deleteCard, openCardModal));
    });

  evt.target.reset();

  closeModal(formNewCardElement);
}

formNewCardElement.addEventListener("submit", handleAddCard);

function openCardModal(cardDataLink, cardDataName) {
  fullImage.src = cardDataLink;
  imageCaption.textContent = cardDataName;
  openModal(cardPopup);
}

// ПР7
//Валидация
const validationCfg = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(validationCfg);

//связь с API
//авторизация
//Токен: 38fef25e-caa8-4f1e-be7e-5ebd7063f6ef
// Идентификатор группы: wff-cohort-1

//Карточки

//Сам профиль выгруз с сервера

Promise.all([getProfileData, getCardsData]).then((result) => {
  profileDesc.textContent = result[0].about;
  profileTitle.textContent = result[0].name;
  profileImage.style.backgroundImage = `url(${result[0].avatar})`;
  const profileId = result[0]._id;

  result[1].forEach((card) => {
    cardList.append(createCard(card, deleteCard, openCardModal, profileId));
  });
});

//Редактирование профиля

// 5 Добавление новой карточки через POST https://nomoreparties.co/v1/cohortId/cards

//6 Отображение количества лайков
//внутри функции createcard

//7 отображение кнопки удалить в card.js

//8 функция удаления карточки в card.js

//9 отправка лайка на сервер
// При постановке и снятии лайка сердечко должно менять цвет, а счётчик лайков увеличиваться или уменьшаться.
// Чтобы изменить количество лайков, нужно отправить на сервер запрос с соответствующим методом.
// Рекомендуем брать количество лайков из ответа сервера,
//  а не из вёрстки. Иначе могут возникнуть ошибки, когда два пользователя одновременно лайкнут одну карточку.

// 10. Обновление аватара пользователя

formNewProfileImage.addEventListener("submit", profileImageHandler);

function profileImageHandler(evt) {
  evt.preventDefault();
  changeProfileImage(profileImageInput.value);
  closeModal(formNewProfileImage);
  profileImage.style.backgroundImage = `url(${profileImageInput.value})`;
}

// openModal(deleteCardPopup);

deleteCardPopup.addEventListener("submit", submitDeleteHandler);

function submitDeleteHandler(evt) {
  evt.preventDefault();
  // deleteCard()  как то сюда надо вкинуть карточку evt наверное
  closeModal(deleteCardPopup);
}
