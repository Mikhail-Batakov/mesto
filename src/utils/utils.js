// //открытие попапов
// export const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleEscClosePopup);
// };

// //закрытие попапов
// export const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleEscClosePopup);
// };

// //закрытие попапов нажатием на Esc
// function handleEscClosePopup(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   };
// };