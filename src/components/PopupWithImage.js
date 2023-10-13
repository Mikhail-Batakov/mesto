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

  open(itemCaption, itemImage) {
     // Устанавливаем src изображения, alt и текст подписи к изображению в попапе
    this._popupImage.src = itemImage;
    this._popupImage.alt = itemCaption;
    this._popupCaption.textContent = itemCaption;

    // Вызываем метод открытия попапа из родительского класса
    super.open();

  };

}