import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitFormCallback }) {
    // Вызываем конструктор родительского класса и передаем ему селектор попапа
    super(popupSelector);
    // Сохраняем колбэк сабмита формы
    this._submitFormCallback = submitFormCallback;
    // Находим форму внутри попапа и сохраняем
    //this._formElement = this._popup.querySelector('.form'); проверить
    // Находим все элементы ввода внутри формы попапа и сохраняем
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

  // Приватный метод для сбора данных всех полей формы
  _getInputValues() {
    this._formValues = {};  // Создаем свойство объекта для хранения данных полей формы
    // Сохраняем значения полей в свойство объекта
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value}); 
    return this._formValues; // Возвращаем сохраненные значения

  }

  //убрать
  setInputValue(dataUser) {
    this._inputList.forEach(input => {
      input.value = dataUser[input.name]}); 
  }

  setEventListeners() {
    // Вызываем метод setEventListeners родительского класса
    super.setEventListeners();
    // Добавляем слушатель события submit формы
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //console.log('отправка массива')
      // Вызываем колбэк сабмита формы и передаем ему данные полей формы
      this._submitFormCallback(this._getInputValues());
      // Закрываем попап после успешной отправки формы
      //this.close();
      //console.log('сабмит')

    });

  }

  close() {
    // Вызываем метод close родительского класса
    super.close();
    // Сбрасываем значения всех полей формы при закрытии попапа
    this._formElement.reset();

  }

}