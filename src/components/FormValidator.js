
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

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    })
    this._toggleButtonState()
  } 

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => { // При отправке формы...
      evt.preventDefault(); // Отменяем стандартное поведение браузера.
    });

    this._setEventListeners(); // Устанавливаем обработчики событий на поля ввода и кнопку сабмита.
  };

}