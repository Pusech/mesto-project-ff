const cardTemplate = document.querySelector("#card-template").content;
const cardList = document.querySelector(".places__list");
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
function deleteCard(btn) {
  btn.closest(".places__item").remove();
}
initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard));
});
