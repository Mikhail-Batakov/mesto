// Импортируем функцию открытия попапа из модуля
import { openPopup } from '../utils/utils.js';

// Класс, представляющий карточку
export default class Card {
    constructor(data, templateSelector, popupZoom) {
    // Сохраняем данные карточки (название и ссылку на изображение)
    this._name = data.name;
    this._link = data.link;
    // Сохраняем селектор template-элемента
    this._templateSelector = templateSelector;
    // Сохраняем ссылку на попап с увеличенным изображением
    this._popupZoom = popupZoom;
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
    this._element.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  }

  // Приватный метод для обработки клика по кнопке "Удалить"
  _handleDeleteCard() {
    this._element.remove();
  }

  // Приватный метод для обработки клика по карточке (открытие попапа с увеличенным изображением)
  _handleCardClick() {
    // Заполняем попап данными из текущей карточки
    this._popupZoom.querySelector('.popup__zoom-caption').textContent = this._name;
    this._popupZoom.querySelector('.popup__zoom-img').src = this._link;
    this._popupZoom.querySelector('.popup__zoom-img').alt = this._name;
    // Открываем попап с увеличенным изображением
    openPopup(this._popupZoom);
  }

  // Приватный метод для установки слушателей событий на элемент карточки
  _setEventListeners() {
    // Добавляем слушатель события для кнопки "Лайк"
    this._element.querySelector('.place__like-btn').addEventListener('click', () => {
      this._handleLikeCard();
    });

    // Добавляем слушатель события для кнопки "Удалить"
    this._element.querySelector('.place__delete-btn').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    // Добавляем слушатель события для клика по изображению (открытие попапа с увеличенным изображением)
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  // Публичный метод для создания и возврата элемента карточки
  generateCard() {
    // Создаем элемент карточки, используя шаблон и данные из текущего объекта
    this._element = this._getTemplate();
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__title').alt = this._name;

    // Устанавливаем слушатели событий для элемента карточки
    this._setEventListeners();

    // Возвращаем созданный элемент карточки
    return this._element;
  }
}
