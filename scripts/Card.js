// Импортируем функцию открытия попапа из модуля
import { openPopup } from '../utils/utils.js';
import { popupZoom, popupZoomCaption, popupZoomImg } from './constants.js';

// Класс, представляющий карточку
export default class Card {
    constructor(data, templateSelector) {
    // Сохраняем данные карточки (название и ссылку на изображение)
    this._name = data.name;
    this._link = data.link;
    // Сохраняем селектор template-элемента
    this._templateSelector = templateSelector;
    
  }

  // Приватный метод для получения шаблона карточки из DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  // Приватный метод для обработки клика по кнопке "Лайк"
  _handleLikeCard() {
    this._buttonLike.classList.toggle('place__like-btn_active');
  }

  // Приватный метод для обработки клика по кнопке "Удалить"
  _handleDeleteCard() {
    this._element.remove();
    this._element = null; // Очищаем ссылку на DOM-элемент
  }

  // Приватный метод для обработки клика по карточке (открытие попапа с увеличенным изображением)
  _handleCardClick() {
    popupZoomCaption.textContent = this._name;
    popupZoomImg.src = this._link;
    popupZoomImg.alt = this._name;
    // Открываем попап с увеличенным изображением
    openPopup(this._popupZoom);
  }

  // Приватный метод для установки слушателей событий на элемент карточки
  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.place__like-btn'); // Сохраняем ссылку на кнопку лайка
    this._popupZoom = popupZoom; 

    // Добавляем слушатель события для кнопки "Лайк"
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeCard();
    });

    // Добавляем слушатель события для кнопки "Удалить"
    this._element.querySelector('.place__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    // Добавляем слушатель события для клика по изображению (открытие попапа с увеличенным изображением)
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // Публичный метод для создания и возврата элемента карточки
  generateCard() {
    // Создаем элемент карточки, используя шаблон и данные из текущего объекта
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');

    this._element.querySelector('.place__title').textContent = this._name;
    this._cardImage.src = this._link; 
    this._cardImage.alt = this._name;

    // Устанавливаем слушатели событий для элемента карточки
    this._setEventListeners();

    // Возвращаем созданный элемент карточки
    return this._element;
  }
}
