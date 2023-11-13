const createCard = (cardData, deleteCallback, openModalCallback) => {
  const cardTemplate = document.querySelector("#card-template").content;

  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const imagePopup = document.querySelector(".popup_type_image");
  console.log(imagePopup);
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function () {
      deleteCallback(cardElement);
    });

  cardImage.addEventListener("click", function () {
    const fullImage = document.querySelector(".popup__image");
    const imageCaption = document.querySelector(".popup__caption");
    fullImage.src = cardData.link;
    imageCaption.textContent = cardData.name;
    openModalCallback(imagePopup);
  });

  likeBtn.addEventListener("click", function () {
    likeHandler(likeBtn);
  });

  return cardElement;
};

function likeHandler(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

function deleteCard(btn) {
  btn.closest(".places__item").remove();
}

export { createCard, likeHandler, deleteCard };
