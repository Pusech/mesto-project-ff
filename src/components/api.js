const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

function updateProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name, // new profile name
      about: about, // new profile about
    }),
  }).then((res) => getResponseData(res));
}

function changeProfileImage(imageLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: imageLink, // avatar
    }),
  }).then((res) => getResponseData(res));
}

function postNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName, // new card name
      link: cardLink, // new card image link
    }),
  }).then((res) => getResponseData(res));
}

const getProfileData = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
  .then((res) => getResponseData(res))
  .catch((err) => console.log(err));

const getCardsData = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
  .then((res) => getResponseData(res))
  .catch((err) => console.log(err));

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res;
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(err));
}
function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export {
  updateProfile,
  changeProfileImage,
  postNewCard,
  getProfileData,
  getCardsData,
  deleteCard,
  putLike,
  removeLike,
};
