//import { popup } from './utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    // Получаем DOM-элемент попапа по селектору и сохраняем
    this._popup = document.querySelector(popupSelector);
    // Привязываем контекст к обработчикам событий
    this._handleEscClose = this._handleEscClose.bind(this);
    // Находим форму внутри попапа и сохраняем
    this._formElement = this._popup.querySelector(".form");
  }

  // Метод для открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Метод для закрытия попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Приватный метод для закрытия попапа при нажатии клавиши Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  // Метод для установки слушателей событий
  setEventListeners() {
    // Устанавливаем слушатель клика на попапе
    this._popup.addEventListener("mousedown", (evt) => {
      // Если клик произошел на оверлее или кнопке закрытия, вызываем метод close()
      if (
        evt.target.classList.contains("popup_opened") ||
        evt.target.classList.contains("popup__close-btn")
      ) {
        this.close();
      }
    });
  }
}
