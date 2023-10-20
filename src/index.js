import './pages/index.css'

import Card from './components/Card.js';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';

//import Popup from './components/Popup.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupDeleteCard from './components/PopupDeleteCard.js';
//import Api from './components/Api.js';

import { 
  initialPlaces, //удалить это и лишнии фотки
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
import PopupDeletCard from './components/PopupDeleteCard.js';

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
//   headers: {
//     authorization: '3edcdea5-b130-42c1-9a7c-9c803e968261',
//     'Content-Type': 'application/json'
//   }
// }); 


const formValidatorFormEditProfile = new FormValidator(configEnableValidation, formEditProfile);
formValidatorFormEditProfile.enableValidation();

const formValidatorForAddPlace = new FormValidator(configEnableValidation, formAddPlace);
formValidatorForAddPlace.enableValidation();

const formEditAvatar = document.querySelector('.form_type_edit-avatar');
const formValidatorFormEditAvatar = new FormValidator(configEnableValidation, formEditAvatar);
formValidatorFormEditAvatar.enableValidation();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'

});
//////////////////////////////////////////////////

// const popupDeleteCard = new PopupDeletCard({
//   popupSelector: '.popup_type_delete-card',
//   submitFormCallback: (item) => {
//     item.removeCard();
//     popupDeleteCard.close();
//   }

// })


const popupDeleteCard = new PopupDeletCard({
  popupSelector: '.popup_type_delete-card',
  submitFormCallback: (card) => {
    // Проверьте, что card не является undefined, прежде чем вызвать removeCard
    if (card) {
      card.removeCard(); // Вызовите метод removeCard на правильном экземпляре Card
      popupDeleteCard.close(); // Закрыть всплывающее окно
    } else {
      console.log('Card is undefined');
    }
  }
});


console.log(popupDeleteCard);
popupDeleteCard.setEventListeners();

const popupZoom = new PopupWithImage('.popup_type_zoom');
popupZoom.setEventListeners();

// Функция для создания новой карточки
function createCard(item, cardTemplateSelector, openPopupZoom) {
  const card = new Card(item, cardTemplateSelector, popupDeleteCard.open, {
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
    const newCardData = { name: placeNameInput.value, link: placeImgInput.value };
    // Используем функцию createCard для создания новой карточки
    const cardElement = createCard(newCardData, cardTemplateSelector, (name, link) => {
      // При клике на карточку открываем попап с изображением и его подписью
      popupZoom.open(name, link);
    });
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
});

//новое
//const popupEditAvata = document.querySelector('.popup_type_edit-avatar');
//console.log(PopupWithForm);
const editAvatarbtn = document.querySelector('.profile__avatar-btn');

// if (popupAvatarSelector) {
//     // Ваш код обработки, если элемент найден
// } else {
//     console.error('Элемент не найден в DOM.');
// }

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  submitFormCallback: (data) => {
  document.querySelector('.profile__avatar').src = data['input-avatar-link'];
  
  //console.log(data['input-avatar-link']);
  popupEditAvatar.close();
  }
});

console.log(popupEditAvatar);//
// console.log('э');
// const editAvatarbtn = document.querySelector('.profile__avatar-btn')

editAvatarbtn.addEventListener('click', () => {
  popupEditAvatar.open();
  formValidatorFormEditAvatar.enableValidation();
});

popupEditAvatar.setEventListeners();

//////////////////////////////////////////////////////////////////////////////////

addPlaceBtn.addEventListener('click', () => {
  popupAddCard.open();
  formValidatorForAddPlace.resetValidation();
});

popupAddCard.setEventListeners();

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
