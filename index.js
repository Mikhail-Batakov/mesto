//import './pages/index.css'

import Card from './components/Card.js';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';

//import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

import UserInfo from './components/UserInfo.js';

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
  addPlaceBtn
  
} from './utils/constants.js';


const formValidatorformEditProfile = new FormValidator(configEnableValidation, formEditProfile);
formValidatorformEditProfile.enableValidation();

const formValidatorForAddPlace = new FormValidator(configEnableValidation, formAddPlace);
formValidatorForAddPlace.enableValidation();

const popupZoom = new PopupWithImage('.popup_type_zoom');
popupZoom.setEventListeners();
// Создаем экземпляр класса Section, передавая ему данные и функцию-рендерер
const cardList = new Section({
  items: initialPlaces, // Массив данных для карточек
  renderer: (item) => {
    // Создаем новый экземпляр класса Card, передавая ему данные, селектор шаблона и функцию-обработчик клика
    const card = new Card(item, cardTemplateSelector, {
      handleCardClick: (name, link) => {
        // При клике на карточку открываем попап с изображением и его подписью
        popupZoom.open(name, link);
      }
    });
    // Генерируем DOM-элемент карточки и добавляем его в контейнер
    const cardElement = card.generateCardElement();
    cardList.addItem(cardElement);
  }
}, placeContainerSelector); 

// Рендерим карточки на странице
cardList.renderItems();

const popupAddСard = new PopupWithForm({
  popupSelector: '.popup_type_add-place',
  submitFormCallback: () => {
    const newCard = { name: placeNameInput.value, link: placeImgInput.value };
    // Создаем новый экземпляр класса Card, передавая ему данные, селектор шаблона и функцию-обработчик клика
    const card = new Card(newCard, cardTemplateSelector, {
      handleCardClick: (name, link) => {
        // При клике на карточку открываем попап с изображением и его подписью
        popupZoom.open(name, link);
      }});
     // Генерируем DOM-элемент карточки и добавляем его в контейнер
      const cardElement = card.generateCardElement();
      cardList.addItem(cardElement);
      popupAddСard.close()

  }});

addPlaceBtn.addEventListener('click', () => {
  popupAddСard.open();
  formValidatorForAddPlace.resetValidation();
});

popupAddСard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'

});

const currentUserInfo = userInfo.getUserInfo();
console.log(currentUserInfo);

// Создайте экземпляр класса PopupWithForm и передайте ему селектор попапа и функцию обратного вызова
const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  submitFormCallback: (formData) => {
    userInfo.setUserInfo(formData);

    console.log(formData); // Выведет объект с данными формы
    // После обработки данных закройте попап редактирования профиля
    popupEditProfile.close();
  }
});

// Добавьте слушатель события на кнопку открытия попапа редактирования профиля
btnPopupProfileEdit.addEventListener('click', () => {
  // Перед открытием попапа установите текущие значения полей формы
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
  // Откройте попап редактирования профиля
  popupEditProfile.open();
});

// Установите слушатели событий для попапа редактирования профиля
popupEditProfile.setEventListeners();















// const popupProfileEdit = new PopupWithForm({popupSelector: '.popup_type_edit-profile', handleProfileFormSubmit: (data) => {
//   userInfo.setUserInfo(data.profileName, data.profileJob);
// }});

// function getDataPopupProfile() {
//   const profileData = userInfo.getUserInfo();
//   nameInput.value = profileData.profileName;
//   jobInput.value = profileData.profileJob;
// }
// popupProfileEdit.setEventListeners();

// btnPopupProfileEdit.addEventListener('click', () => {
//   popupProfileEdit.open(); 
//   getDataPopupProfile();
  

  
// });




// const popupEditProfile = document.querySelector('.popup_type_edit-profile');
// const btnPopupProfileEdit = document.querySelector('.profile__edit-btn');

// const popupProfileEdit = new PopupWithForm({
//   popupSelector: '.popup_type_edit-profile',
//   submitFormCallback: (data) => {
//     userInfo.setUserInfo(data);
//     console.log(data);
//     //popupProfileEdit.close();
    
//   }});

// btnPopupProfileEdit.addEventListener('click', () => {
//   setProfileInputs();
//   console.log(jobInput.value, nameInput.value);

//   formValidatorformEditProfile.enableValidation();
//   popupProfileEdit.open(); 
// });


//   function setProfileInputs() {
//     const profileInput = userInfo.getUserInfo();
//     nameInput.value = profileInput.profileName;
//     jobInput.value = profileInput.profileJob;
//     console.log(jobInput.value, nameInput.value)
//   }


//   popupProfileEdit.setEventListeners();


// const popupProfileEdit = new PopupWithForm({
//   popupSelector: '.popup_type_edit-profile',
//   submitFormCallback: (data) => {
//     userInfo.setUserInfo(data);
//     console.log(data);
//     popupProfileEdit.close();
//   }});


//   function setProfileInputs() {
//     const profileInput = userInfo.getUserInfo();
//     nameInput.value = profileInput.profileName;
//     jobInput.value = profileInput.profileJob;
//     console.log(jobInput.value, nameInput.value)
//   }

// btnPopupProfileEdit.addEventListener('click', () => {
//   popupProfileEdit.open(); 
//   setProfileInputs();
//   console.log(setProfileInputs());
//   formValidatorformEditProfile.enableValidation();


// });




// const popupProfileEdit = new PopupWithForm({
//   popupSelector: '.popup_type_edit-profile', submitFormCallback: (data) => {
//     userInfo.setUserInfo(data);
//     console.log(data)
// }});


// const cardList = new Section({
//   items: initialPlaces,
//   renderer: (data) => {
//     const card = generateCard(data);
//     cardList.addItem(card);
//   }
// }, '.places__content');


// function generateCard (data) {
//   const cardElement = new Card(data, placeTemplateSelector, handleCardClick);
//   const cardAdd = cardElement.generateCardElement();
//   return cardAdd;
  
// };



// function handleCardClick(name, link) {
//   popupZoom.open(name, link);
// }




// const cardList = new Section({
//   items: initialPlaces,
//   renderer: (data) => {
//     const card = generateCard(data, { handleCardClick });
//     cardList.addItem(card);
//   }
// }, '.places__content');



// function generateCard(data, { handleCardClick }) {
//   const cardElement = new Card(data, placeTemplateSelector, { handleCardClick });
//   const cardAdd = cardElement.generateCardElement();
//   return cardAdd;
// }

// function handleCardClick(name, link) {
  
//   popupZoom.open(name, link);
  
//   console.log(name);
//   console.log(link);
//   console.log("name:", name, "link:", link);
// }
// console.log(handleCardClick);




//закрытие попапов кликом на оверлей
// function handleOverlayClosePopup(evt) {
//   if (evt.target.classList.contains('popup_opened')) {
//     closePopup(evt.target);
//   };
// };

// Установка слушателей
// popups.forEach((popup) => {
//   const closeButton = popup.querySelector('.popup__close-btn');
//   closeButton.addEventListener('click', handleClosePopup);
//   popup.addEventListener('click', handleOverlayClosePopup);
// });

// Функция для закрытия попапа при клике на крестик
// function handleClosePopup(evt) {
//   const popup = evt.target.closest('.popup'); 
//   closePopup(popup); // Закрываем соответствующий попап
// }

// //попап редактирование профиля
// function openPopupProfileEdit() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   openPopup(popupEditProfile);
// };

// //заполнение данных профиля
// function handleFormSubmitProfile (evt) {
//   evt.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;

//   closePopup(popupEditProfile);

// };

// btnPopupProfileEdit.addEventListener('click', openPopupProfileEdit);
// formEditProfile.addEventListener('submit', handleFormSubmitProfile); 

// // const renderCardElement = (data) => {
// //   const cardElement = new Card(data, placeTemplateSelector, openPopup).generateCard();
// //   placeContainer.prepend(cardElement);
// // };

// const renderCardElement = (data) => {
//   const cardElement = new Card(data, placeTemplateSelector, handleCardClick).generateCard();
//   placeContainer.prepend(cardElement);
// };

// initialPlaces.forEach((place) => {
//   renderCardElement (place);
// });

// //попап добавления новой карточки
// const openPopupAddPlace = () => {

//   openPopup(popupAddPlace);
// };

// addPlaceBtn.addEventListener('click', openPopupAddPlace);

// // добавление новых карточек
// const addNewPlace = (evt) => {
//   evt.preventDefault();

//   const newPlace = {
//     name: placeNameInput.value,
//     link: placeImgInput.value,
//   };

//   renderCardElement(newPlace);

//   closePopup(popupAddPlace);
  
//   evt.target.reset(); 

//   formValidatorForAddPlace.resetValidation();
  
// };

// formAddPlace.addEventListener('submit', addNewPlace); 





//const formElements = document.querySelectorAll(configEnableValidation.formSelector);

// formElements.forEach((formElement) => {
//   const validator = new FormValidator(configEnableValidation, formElement);
//   validator.enableValidation();
// });