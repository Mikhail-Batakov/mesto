import "./index.css";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";

//import Popup from './components/Popup.js';
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeletCard from "../components/PopupDeleteCard.js";
import Api from "../components/Api.js";

import {
  configEnableValidation,
  cardTemplateSelector,
  placeContainerSelector,
  formEditProfile,
  nameInput,
  jobInput,
  btnPopupProfileEdit,
  formAddPlace,
  addPlaceBtn,
} from "../utils/constants.js";

import { data } from "autoprefixer";
import { Promise } from "core-js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-77",
  headers: {
    authorization: "3edcdea5-b130-42c1-9a7c-9c803e968261",
    "Content-Type": "application/json",
  },
});

const formValidatorFormEditProfile = new FormValidator(
  configEnableValidation,
  formEditProfile,
);
formValidatorFormEditProfile.enableValidation();

const formValidatorForAddPlace = new FormValidator(
  configEnableValidation,
  formAddPlace,
);
formValidatorForAddPlace.enableValidation();

const formEditAvatar = document.querySelector(".form_type_edit-avatar");
const formValidatorFormEditAvatar = new FormValidator(
  configEnableValidation,
  formEditAvatar,
);
formValidatorFormEditAvatar.enableValidation();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

const popupDeleteCard = new PopupDeletCard({
  popupSelector: ".popup_type_delete-card",
  submitFormCallback: (card, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        popupDeleteCard.close();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => popupDeleteCard.setInitialText());
  },
});

popupDeleteCard.setEventListeners();

const popupZoom = new PopupWithImage(".popup_type_zoom");
popupZoom.setEventListeners();

// Функция для создания новой карточки
function createCard(item) {
  const card = new Card(
    item,
    cardTemplateSelector,
    popupDeleteCard.open,
    popupZoom.open,
    (likeBtn, cardId) => {
      if (likeBtn.classList.contains("place__like-btn_active")) {
        api
          .deleteCardLike(cardId)
          .then((res) => {
            console.log(res);
            card.toggelLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при удалении лайка с карточки ${error}`),
          )
          .finally();
      } else {
        api
          .setCardLike(cardId)
          .then((res) => {
            console.log(res);
            card.toggelLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при добавлении лайка на карточку ${error}`),
          )
          .finally();
      }
    },
  );
  // Генерируем DOM-элемент карточки и возвращаем его
  return card.generateCardElement();
}

// Создаем экземпляр класса Section, передавая ему данные и функцию-рендерер
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  placeContainerSelector,
);

//Создаем экземпляр класса Section, передавая ему данные и функцию-рендерер
const popupAddCard = new PopupWithForm({
  popupSelector: ".popup_type_add-place",
  submitFormCallback: (data) => {
    Promise.all([api.getUserInfo(), api.sendNewCardInfo(data)])
      .then(([userData, cardData]) => {
        cardData.myId = userData._id;
        cardList.addItem(createCard(cardData));
        popupAddCard.close();
      })
      .catch((error) =>
        console.error(`Ошибка при добавлении карточки ${error}`),
      )
      .finally(() => popupAddCard.setInitialText());
  },
});

const editAvatarbtn = document.querySelector(".profile__avatar-btn");

const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  submitFormCallback: (data) => {
    api
      .setUserAvatar(data)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        popupEditAvatar.close();
      })
      .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
      .finally(() => popupEditAvatar.setInitialText());
  },
});

editAvatarbtn.addEventListener("click", () => {
  popupEditAvatar.open();
  //formValidatorFormEditAvatar.enableValidation();
});

popupEditAvatar.setEventListeners();

addPlaceBtn.addEventListener("click", () => {
  popupAddCard.open();
});

popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  submitFormCallback: (userData) => {
    api
      .sendUserInfo(userData)
      .then((res) => {
        console.log(res);
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        popupEditProfile.close();
      })
      .catch((error) => console.error(`Ошибка при обновлении профиля ${error}`))
      .finally(() => popupEditProfile.setInitialText());
  },
});

function setCurrentUserInfo() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
}

btnPopupProfileEdit.addEventListener("click", () => {
  // Перед открытием попапа установит текущие значения полей формы
  setCurrentUserInfo();
  // Откройте попап редактирования профиля
  popupEditProfile.open();
});

// Установите слушатели событий для попапа редактирования профиля
popupEditProfile.setEventListeners();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    //добавляем myId в карточку
    cardData.forEach((element) => {
      element.myId = userData._id;
    });

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    console.log(cardData);
    cardList.renderElements(cardData.reverse());
  })
  .catch((error) => console.error(`Ошибка при загрузке данных ${error}`));
