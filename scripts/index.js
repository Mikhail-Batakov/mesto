import { initialPlaces, configEnableValidation } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

import { openPopup, closePopup } from '../utils/utils.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const btnPopupProfileEdit = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

const formAddPlace = document.querySelector('.form_type_add-place');
const placeNameInput = formAddPlace.querySelector('.form__input_type_place-name');
const placeImgInput = formAddPlace.querySelector('.form__input_type_place-link');

// const popupZoom = document.querySelector('.popup_type_zoom');
// const popupZoomCaption = document.querySelector('.popup__zoom-caption');
// const popupZoomImg = document.querySelector('.popup__zoom-img');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const addPlaceBtn = document.querySelector('.profile__add-btn');

const placeContainer = document.querySelector('.places__content');
const placeTemplateSelector = '#place-template';

const formElements = document.querySelectorAll(configEnableValidation.formSelector);

// formElements.forEach((formElement) => {
//   const validator = new FormValidator(configEnableValidation, formElement);
//   validator.enableValidation();
// });

const formValidatorformEditProfile = new FormValidator(configEnableValidation, formEditProfile);
formValidatorformEditProfile.enableValidation();

const formValidatorForAddPlace = new FormValidator(configEnableValidation, formAddPlace);
formValidatorForAddPlace.enableValidation();

//закрытие попапов кликом на оверлей
function handleOverlayClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

// Установка слушателей
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close-btn');
  closeButton.addEventListener('click', handleClosePopup);
  popup.addEventListener('click', handleOverlayClosePopup);
});

// Функция для закрытия попапа при клике на крестик
function handleClosePopup(evt) {
  const popup = evt.target.closest('.popup'); 
  closePopup(popup); // Закрываем соответствующий попап
}

//попап редактирование профиля
function openPopupProfileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
};

//заполнение данных профиля
function handleFormSubmitProfile (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);

};

btnPopupProfileEdit.addEventListener('click', openPopupProfileEdit);
formEditProfile.addEventListener('submit', handleFormSubmitProfile); 

const renderCardElement = (data) => {
  const cardElement = new Card(data, placeTemplateSelector, openPopup).generateCard();
  placeContainer.prepend(cardElement);
};

initialPlaces.forEach((place) => {
  renderCardElement (place);
});

//попап добавления новой карточки
const openPopupAddPlace = () => {

  openPopup(popupAddPlace);
};

addPlaceBtn.addEventListener('click', openPopupAddPlace);

// добавление новых карточек
const addNewPlace = (evt) => {
  evt.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeImgInput.value,
  };

  renderCardElement(newPlace);

  closePopup(popupAddPlace);
  
  evt.target.reset(); 

  formValidatorForAddPlace.resetValidation();
  
};

formAddPlace.addEventListener('submit', addNewPlace); 