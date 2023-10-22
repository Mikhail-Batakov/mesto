import Popup from "./Popup.js";

export default class PopupDeletCard extends Popup {
  constructor({ popupSelector, submitFormCallback }) {
    // Вызываем конструктор родительского класса и передаем ему селектор попапа
    super(popupSelector);
    // Сохраняем колбэк сабмита формы
    this._submitFormCallback = submitFormCallback;
    this._submitBtn = this._formElement.querySelector('.form__submit-btn');
    this._initialButtonText = this._submitBtn.textContent;
    
  }


  setEventListeners() {
    // Вызываем метод setEventListeners родительского класса
    super.setEventListeners();
    // Добавляем слушатель события submit формы
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitBtn.textContent = `${this._submitBtn.textContent}...` //добавление ... при загрузке сабмита
      this._submitFormCallback(this._card, this._cardId); // Передача данных в колбэк
    
    });

  }  

  open = ({ card, cardId }) => {
    super.open();
    this._card = card;
    this._cardId = cardId;

  }

  setInitialText() {
    this._submitBtn.textContent = this._initialButtonText;

  }

}