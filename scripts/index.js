// @todo: Темплейт карточки
const placeTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = function () {
  for (let i = 0; i < initialCards.length; i++) {
    const placeElement = placeTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    placeElement.querySelector(".card__image").src = initialCards[i].link;
    placeElement.querySelector(".card__title").textContent =
      initialCards[i].name;
    placesList.append(placeElement);
  }
  const deleteBtn = document.querySelectorAll(".card__delete-button");
  deleteBtn.forEach((btn) =>
    btn.addEventListener("click", function () {
      deleteCard(btn);
    })
  );
};

// @todo: Функция удаления карточки
function deleteCard(btn) {
  const listItem = btn.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу
createCard();
