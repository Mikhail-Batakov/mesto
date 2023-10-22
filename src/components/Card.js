// Класс, представляющий карточку
export default class Card {
  constructor(
    data,
    templateSelector,
    openpopupDeleteCard,
    handleCardClick,
    clickLike,
  ) {
    console.log(data);
    // Сохраняем данные карточки
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;

    this._templateSelector = templateSelector;
    this._openpopupDeleteCard = openpopupDeleteCard;
    this._handleCardClick = handleCardClick;
    this.clickLike = clickLike;
  }

  // Приватный метод для получения шаблона карточки из DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard = () => {
    this.clickLike(this._buttonLike, this._cardId);
  };

  toggelLike(likes) {
    this._buttonLike.classList.toggle("place__like-btn_active");
    this._likesNumber.textContent = likes.length; /// проверить
  }

  _handleOpenPopupZoom = () => {
    this._handleCardClick(this._name, this._link);
  };

  _handleDeleteCard = () => {
    this._openpopupDeleteCard({ card: this, cardId: this._cardId });
  };

  removeCard() {
    this._element.remove();
    this._element = null; // Очищаем ссылку на DOM-элемент
  }

  //Показываем или убираем значок корзины
  _modeVisibleCardDeleteBtn() {
    if (this._myId === this._ownerId) {
      this._cardDeleteBtn.style.display = "block";
    } else {
      this._cardDeleteBtn.style.display = "none";
    }
  }

  _cheсkLike() {
    this._likes.forEach((item) => {
      if (item._id === this._myId) {
        this._buttonLike.classList.add("place__like-btn_active");
      }
    });
    this._likesNumber.textContent = this._likesLength;
  }

  // Приватный метод для установки слушателей событий на элемент карточки
  _setEventListeners() {
    // Добавляем слушатель события для кнопки "Лайк"
    this._buttonLike.addEventListener("click", this._handleLikeCard);
    // Добавляем слушатель события для кнопки "Удалить"
    this._cardDeleteBtn.addEventListener("click", this._handleDeleteCard);
    // Добавляем слушатель события для клика по изображению (открытие попапа с увеличенным изображением)
    this._cardImage.addEventListener("click", this._handleOpenPopupZoom);
  }

  // Метод для создания и возврата элемента карточки
  generateCardElement() {
    this._element = this._getTemplate();

    // Создаем элемент карточки, используя шаблон и данные из текущего объекта
    this._cardImage = this._element.querySelector(".place__image");
    this._cardName = this._element.querySelector(".place__title");
    this._cardDeleteBtn = this._element.querySelector(".place__delete-btn"); // +кнопка удаления карточки
    this._buttonLike = this._element.querySelector(".place__like-btn"); // Сохраняем ссылку на кнопку лайка
    this._likesNumber = this._element.querySelector(".place__likes-number"); //counter

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._modeVisibleCardDeleteBtn();
    this._cheсkLike();
    // Устанавливаем слушатели событий для элемента карточки
    this._setEventListeners();

    // Возвращаем созданный элемент карточки
    return this._element;
  }
}
