
export default class FormValidator {
  // Конструктор класса, принимает объект config и элемент формы.
  constructor(config, formElement) { 
    this._config = config; // Сохранение настроек валидации внутри экземпляра класса.
    this._formElement = formElement; // Сохранение элемента формы внутри экземпляра класса.

    this._submitButton = formElement.querySelector(config.submitButtonSelector); // Находим кнопку сабмита внутри формы.
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // Находим все поля ввода внутри формы и преобразуем их в массив.
            
  };

//Всплытие ошибки валидации формы
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);

  };


  //Скрытие ошибки валидации формы
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

//Проверка валидации формы
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }

  };

//Метод определяет все ли поля валидны.
  _hasInvalidInput = () => {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  };
      
// Приватный метод, управляет состоянием кнопки сабмита в зависимости от валидности формы.
  _toggleButtonState = () => {
    if (!this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', 'disabled');

    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');

    }
  };

// Приватный метод, устанавливает обработчики событий на поля ввода.
  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { // При событии 'input'...
        this._checkInputValidity(inputElement); // Проверяем валидность поля ввода.
        this._toggleButtonState(); // Обновляем состояние кнопки сабмита.
      });
      
    });
    this._toggleButtonState(); // Вызываем метод для установки начального состояния кнопки сабмита.
  }; 

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => { // При отправке формы...
      evt.preventDefault(); // Отменяем стандартное поведение браузера.
    });

    this._setEventListeners(); // Устанавливаем обработчики событий на поля ввода и кнопку сабмита.
  };

}

const configEnableValidation = {
  formSelector: '.form', // формы
  inputSelector: '.form__input', // поля
  submitButtonSelector: '.form__submit-btn', // submit-btn
  inactiveButtonClass: 'form__submit-btn_disabled', // submit-btn-disable
  inputErrorClass: 'form__input_type_error', // красная линия инпут
  errorClass: 'form__span-error_visible', // надпись об ошибке
};

const formElements = document.querySelectorAll(configEnableValidation.formSelector);

formElements.forEach((formElement) => {
  const validator = new FormValidator(configEnableValidation, formElement);
  validator.enableValidation();
});









// //Всплытие ошибки валидации формы
// const showInputError = (formElement, inputElement, errorMessage, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(config.errorClass);

// };


// //Скрытие ошибки валидации формы
// const hideInputError = (formElement, inputElement, config) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(config.inputErrorClass);
//   errorElement.classList.remove(config.errorClass);
//   errorElement.textContent = '';
// };

// //Проверка валидации формы
// const checkInputValidity = (formElement, inputElement, config) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, config);
//   } else {
//     hideInputError(formElement, inputElement, config);
//   }

// };

// //обработчика события input
// const setEventListeners = (formElement, config) => {
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
//   const submitButton = formElement.querySelector(config.submitButtonSelector);

//   // чтобы проверить состояние кнопки в самом начале
//   toggleButtonState(inputList, submitButton, config);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, config);
//       // чтобы проверять его при изменении любого из полей
//       toggleButtonState(inputList, submitButton, config);
//     });
    
//   });
//   toggleButtonState(inputList, submitButton, config);
// }; 

// const hasInvalidInput = (inputList) => {
//   return inputList.every((inputElement) => inputElement.validity.valid);
//   };
  
//   const toggleButtonState = (inputList, submitButton, config) => {
//     if (!hasInvalidInput(inputList)) {
//     submitButton.classList.add(config.inactiveButtonClass);
//     submitButton.setAttribute('disabled', 'disabled');

//     } else {
//     submitButton.classList.remove(config.inactiveButtonClass);
//     submitButton.removeAttribute('disabled');

//     }
//   };

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     // formElement.addEventListener('submit', function (evt) {
//     //   evt.preventDefault();
//     // });
//     setEventListeners(formElement, config);
//     });
// };

// const configEnableValidation = {
//   formSelector: '.form', //формы
//   inputSelector: '.form__input', //поля
//   submitButtonSelector: '.form__submit-btn', //submit-btn
//   inactiveButtonClass: 'form__submit-btn_disabled', //submit-btn-disable
//   inputErrorClass: 'form__input_type_error', //красная линия инпут
//   errorClass: 'form__span-error_visible', //надпись об ошибке
// };

// enableValidation(configEnableValidation);

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//   return !inputElement.validity.valid;
// });

// };