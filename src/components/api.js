function updateProfile(name, about) {
  fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me", {
    method: "PATCH",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name, // new profile name
      about: about, // new profile about
    }),
  });
}

function changeProfileImage(imageLink) {
  fetch("https://nomoreparties.co/v1/wff-cohort-1/users/me/avatar", {
    method: "PATCH",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: imageLink, // avatar
    }),
  });
}

// function postNewImage(name, link) {
//   fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
//     method: "POST",
//     headers: {
//       authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: name, // new card name
//       link: link, // new card image link
//     }),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       return res;
//     });
// }

const getProfileData = fetch(
  "https://nomoreparties.co/v1/wff-cohort-1/users/me",
  {
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
    },
  }
)
  .then((res) => res.json())
  .then((result) => {
    return result;
  });

const getCardsData = fetch("https://nomoreparties.co/v1/wff-cohort-1/cards", {
  headers: {
    authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
  },
})
  .then((res) => res.json())
  .then((result) => {
    return result;
  });

function putLike(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
  });
}

function deleteLike(cardId) {
  fetch(`https://nomoreparties.co/v1/wff-cohort-1/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: "38fef25e-caa8-4f1e-be7e-5ebd7063f6ef",
      "Content-Type": "application/json",
    },
  });
}

export { updateProfile, changeProfileImage, getProfileData, getCardsData };
