export const initialPlaces = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const configEnableValidation = {
  formSelector: '.form', // формы
  inputSelector: '.form__input', // поля
  submitButtonSelector: '.form__submit-btn', // submit-btn
  inactiveButtonClass: 'form__submit-btn_disabled', // submit-btn-disable
  inputErrorClass: 'form__input_type_error', // красная линия инпут
  errorClass: 'form__span-error_visible', // надпись об ошибке
};

export const popups = document.querySelectorAll('.popup');

export const cardTemplateSelector = '#place-template';
export const placeContainerSelector = '.places__content';

export const formEditProfile = document.querySelector('.form');
export const nameInput = document.querySelector('.form__input_type_name');
export const jobInput = document.querySelector('.form__input_type_job');

export const btnPopupProfileEdit = document.querySelector('.profile__edit-btn');
export const addPlaceBtn = document.querySelector('.profile__add-btn');

export const formAddPlace = document.querySelector('.form_type_add-place');

export const placeNameInput = formAddPlace.querySelector('.form__input_type_place-name');
export const placeImgInput = formAddPlace.querySelector('.form__input_type_place-link');