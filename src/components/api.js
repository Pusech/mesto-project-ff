function updateProfile(name, about) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name, // new profile name
      about: about, // new profile about
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function changeProfileImage(imageLink) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: imageLink, // avatar
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function postNewCard(cardName, cardLink) {
  return fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
    method: "POST",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardName, // new card name
      link: cardLink, // new card image link
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

const getProfileData = fetch(
  "https://nomoreparties.co/v1/wff-cohort-1/users/me",
  {
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
    },
  }
)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .catch((err) => console.log(err));

const getCardsData = fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
  headers: {
    authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => console.log(err));

export {
  updateProfile,
  changeProfileImage,
  postNewCard,
  getProfileData,
  getCardsData,
};
