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
  // console.log(cardData.likes);
  // console.log(cardData.likes.find((obj) => obj._id === profileId));
  // нужно сначала вызвать попап а потом при сабмите вызывать deleteCard

  if (cardData.owner._id === profileId) {
    //найти свой айди както (ЧЕРЕЗ GETPROFILE)
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

  const likeCount = cardElement.querySelector(".card__like-count");
  if (cardData.likes) {
    likeCount.textContent = cardData.likes.length;
  }
  likeBtn.addEventListener("click", function () {
    likeCount.textContent = likeHandler(
      likeBtn,
      cardData._id,
      likeCount.textContent
    );
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

function likeHandler(likeBtn, cardId, likeCounter) {
  if (!likeBtn.classList.contains("card__like-button_is-active")) {
    // нужно делать проверку на наличие лайка в базе cardData.likes.find((obj) => obj._id === profileId)
    //мб запихнуть проверку куда то еще и разделить функции пут и делит падумай

    fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
        "Content-Type": "application/json",
      },
    })
      .then(likeBtn.classList.toggle("card__like-button_is-active"))
      .then(likeCounter++);
  } else {
    fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
        "Content-Type": "application/json",
      },
    })
      .then(likeBtn.classList.toggle("card__like-button_is-active"))
      .then(likeCounter--);
  }
  return likeCounter;
}

export { createCard, likeHandler, deleteCard };
