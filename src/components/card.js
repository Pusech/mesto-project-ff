import { deleteCard, putLike, removeLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardData, deleteCallback, openModalCallback, profileId) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  //добавляет корзинку если айди карты == юзер айди
  if (cardData.owner._id === profileId) {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", function () {
        deleteCallback(cardElement, cardData._id);
      });
  } else {
    cardElement.querySelector(".card__delete-button").remove();
  }

  cardImage.addEventListener("click", function () {
    openModalCallback(cardData.link, cardData.name);
  });

  // //Делает сердечко лайкнутым если пост был лайкнут юзером аккаунта
  if (cardData.likes.find((obj) => obj._id === profileId)) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  const likeCountElement = cardElement.querySelector(".card__like-count");
  likeCountElement.textContent = cardData.likes.length;

  // листенер лайков
  likeBtn.addEventListener("click", function () {
    likeHandler(likeBtn, cardData._id, likeCountElement);
  });

  return cardElement;
};

// Общее количество лайков на карточке обновляется каждый раз как юзер лайкает пост
function likeHandler(likeBtn, cardId, likeCountElement) {
  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    putLike(cardId)
      .then((data) => {
        likeCountElement.textContent = data.likes.length;
        likeBtn.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  } else {
    removeLike(cardId)
      .then((data) => {
        likeCountElement.textContent = data.likes.length;
        likeBtn.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => console.log(err));
  }
}

export { createCard, deleteCard };
