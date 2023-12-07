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
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  return cardElement;
};

function deleteCard(card, cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
  }).then(card.remove());
}

// Общее количество лайков на карточке обновляется каждый раз как юзер лайкает пост
function likeHandler(likeBtn, cardId, likeCountElement) {
  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        likeCountElement.textContent = data.likes.length;
      });
  } else {
    fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        likeCountElement.textContent = data.likes.length;
      });
  }
}

export { createCard, deleteCard };
