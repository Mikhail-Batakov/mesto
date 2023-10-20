import Popup from "./Popup.js";

export default class PopupDeletCard extends Popup {
  constructor({ popupSelector, submitFormCallback }) {
    // Вызываем конструктор родительского класса и передаем ему селектор попапа
    super(popupSelector);
    // Сохраняем колбэк сабмита формы
    this._submitFormCallback = submitFormCallback;
    
  }

  setEventListeners() {
    // Вызываем метод setEventListeners родительского класса
    super.setEventListeners();
    // Добавляем слушатель события submit формы
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._element); // Передача данных в колбэк
      // Закрыть попап после успешной отправки формы
      this.close();

    });

  }  

  open = (element) => {
    super.open();
    console.log(element)
    this._element = element;

  }


}