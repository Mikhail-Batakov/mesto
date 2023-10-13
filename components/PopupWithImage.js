import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    // Вызываем конструктор родительского класса и передаем ему селектор попапа
    super(popupSelector);
    // Находим элементы изображения и подписи внутри попапа и сохраняем их
    this._popupImage = this._popup.querySelector('.popup__zoom-img');
    this._popupCaption = this._popup.querySelector('.popup__zoom-caption');
    //console.log(this._popupCaption, this._popupImage);
  };

  open(cardCaption, cardImage) {
     // Устанавливаем src изображения, alt и текст подписи к изображению в попапе
    this._popupImage.src = cardImage;
    this._popupImage.alt = cardCaption;
    this._popupCaption.textContent = cardCaption;

    // Вызываем метод открытия попапа из родительского класса
    super.open();

  };

}