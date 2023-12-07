const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(
      "Разрешены латинские и кириллические буквы, дефисы и пробелы."
    );
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения

    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // теперь, если ошибка вызвана регулярным выражением,
    // переменная validationMessage хранит наше кастомное сообщение
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass); //errorClass
}

function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass); // errorClass
  errorElement.textContent = "";
}

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
}

function hasInvalidInput(inputList) {
  return inputList.every((el) => {
    return el.validity.valid;
  });
}

function toggleButtonState(
  inputList,
  submitButtonSelector,
  inactiveButtonClass
) {
  if (!hasInvalidInput(inputList)) {
    submitButtonSelector.classList.add(inactiveButtonClass);
  } else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
  }
}
// Создайте функцию clearValidation, которая очищает ошибки валидации формы и делает кнопку неактивной.
//  Эта функция должна принимать как параметры DOM-элемент формы,
//  для которой очищаются ошибки валидации и объект с настройками валидации
//Используйте функцию clearValidation при заполнении
// формы профиля во время её открытия
// и при очистке формы добавления карточки. ???????????????????!!!!!!!!!!!!!!!!??????????????????
function clearValidation(
  profileForm,
  {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) {
  const inputList = Array.from(profileForm.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, inputErrorClass, errorClass); //убираем ошибку
  });
  const formSubmitButton = profileForm.querySelector(submitButtonSelector);
  formSubmitButton.classList.add(inactiveButtonClass); // делаем кнопку неактивной
}

export { checkInputValidity, enableValidation, clearValidation };
