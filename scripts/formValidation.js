//Всплытие ошибки валидации формы
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);

};

//Скрытие ошибки валидации формы
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//Проверка валидации формы
const checkInputValidity = (formElement, inputElement, config) => {

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }

};

//обработчика события input
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, submitButton, config);
    });
  });

}; 

const hasInvalidInput = (inputList) => {
  return inputList.every((inputElement) => inputElement.validity.valid);
  };
  
  const toggleButtonState = (inputList, submitButton, config) => {
  if (!hasInvalidInput(inputList)) {
  submitButton.classList.add(config.inactiveButtonClass);
  } else {
  submitButton.classList.remove(config.inactiveButtonClass);
  }
  };

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
          });
};

const enableValidationConfig = {
  formSelector: '.form', //формы
  inputSelector: '.form__input', //поля
  submitButtonSelector: '.form__submit-btn', //submit-btn
  inactiveButtonClass: 'form__submit-btn_disabled', //submit-btn-disable
  inputErrorClass: 'form__input_type_error', //красная линия инпут
  errorClass: 'form__span-error_visible', //надпись об ошибке
};

enableValidation(enableValidationConfig);








// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// });

// };