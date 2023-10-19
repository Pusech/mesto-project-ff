// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (cardData, deleteCallback) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallback(cardElement);
    });
  return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard(btn) {
  const listItem = btn.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
const renderInitialCards = (function () {
  initialCards.forEach((card) => {
    cardList.append(createCard(card, deleteCard));
  });
})();
