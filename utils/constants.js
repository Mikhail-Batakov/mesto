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

export const popupZoom = document.querySelector('.popup_type_zoom');
export const popupZoomCaption = document.querySelector('.popup__zoom-caption');
export const popupZoomImg = document.querySelector('.popup__zoom-img');