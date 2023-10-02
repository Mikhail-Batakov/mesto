export const configEnableValidation = {
  formSelector: '.form', // формы
  inputSelector: '.form__input', // поля
  submitButtonSelector: '.form__submit-btn', // submit-btn
  inactiveButtonClass: 'form__submit-btn_disabled', // submit-btn-disable
  inputErrorClass: 'form__input_type_error', // красная линия инпут
  errorClass: 'form__span-error_visible', // надпись об ошибке
};

//открытие попапов
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
};

//закрытие попапов
export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClosePopup);
};

//закрытие попапов нажатием на Esc
function handleEscClosePopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};