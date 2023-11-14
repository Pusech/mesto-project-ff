const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardData, deleteCallback, openModalCallback) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallback(cardElement);
    });

  cardImage.addEventListener("click", function () {
    openModalCallback(cardData.link, cardData.name);
  });

  likeBtn.addEventListener("click", function () {
    likeHandler(likeBtn);
  });

  return cardElement;
};

function likeHandler(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

function deleteCard(card) {
  card.remove();
}

export { createCard, likeHandler, deleteCard };
