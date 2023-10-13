import './pages/index.css'

import Card from './components/Card.js';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';

//import Popup from './components/Popup.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

import { 
  initialPlaces,
  configEnableValidation,
  cardTemplateSelector,
  placeContainerSelector,
  formEditProfile,
  nameInput,
  jobInput,
  btnPopupProfileEdit,
  formAddPlace,
  placeNameInput, 
  placeImgInput,
  addPlaceBtn,
  
} from './utils/constants.js';

const formValidatorFormEditProfile = new FormValidator(configEnableValidation, formEditProfile);
formValidatorFormEditProfile.enableValidation();

const formValidatorForAddPlace = new FormValidator(configEnableValidation, formAddPlace);
formValidatorForAddPlace.enableValidation();

const popupZoom = new PopupWithImage('.popup_type_zoom');
popupZoom.setEventListeners();

// Функция для создания новой карточки
function createCard(item, cardTemplateSelector, openPopupZoom) {
  const card = new Card(item, cardTemplateSelector, {
    handleCardClick: () => {
      // При клике на карточку вызываем переданную функцию-обработчик
      openPopupZoom(item.name, item.link);
    }
  });
  // Генерируем DOM-элемент карточки и возвращаем его
  return card.generateCardElement();
}

// Создаем экземпляр класса Section, передавая ему данные и функцию-рендерер
const cardList = new Section({
  items: initialPlaces, // Массив данных для карточек
  renderer: (item) => {
    // Используем функцию createCard для создания карточки
    const cardElement = createCard(item, cardTemplateSelector, (name, link) => {
      // При клике на карточку открываем попап с изображением и его подписью
      popupZoom.open(name, link);
    });
    cardList.addItem(cardElement);
  }
}, placeContainerSelector);

// Рендерим карточки на странице
cardList.renderItems();

// Создаем экземпляр класса Section, передавая ему данные и функцию-рендерер
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-place',
  submitFormCallback: () => {
    const newCard = { name: placeNameInput.value, link: placeImgInput.value };
    // Используем функцию createCard для создания новой карточки
    const cardElement = createCard(newCard, cardTemplateSelector, (name, link) => {
      // При клике на карточку открываем попап с изображением и его подписью
      popupZoom.open(name, link);
    });
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
});

addPlaceBtn.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorForAddPlace.resetValidation();
});

popupAddCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'

});

// const currentUserInfo = userInfo.getUserInfo();
// console.log(currentUserInfo);

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  submitFormCallback: () => {
    const newData = { name: nameInput.value, job: jobInput.value };
    userInfo.setUserInfo(newData); // Передаем данные в метод setUserInfo объекта userInfo
    popupEditProfile.close(); // Закрываем попап
    
  }
});

function setCurrentUserInfo() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;

}

btnPopupProfileEdit.addEventListener('click', () => {
  // Перед открытием попапа установит текущие значения полей формы
  setCurrentUserInfo();
  formValidatorFormEditProfile.enableValidation();
  // Откройте попап редактирования профиля
  popupEditProfile.open();
});

// Установите слушатели событий для попапа редактирования профиля
popupEditProfile.setEventListeners();
