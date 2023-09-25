import { initialPlaces } from './constants.js';

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

const popupZoom = document.querySelector('.popup_type_zoom');
const popupZoomCaption = document.querySelector('.popup__zoom-caption');
const popupZoomImg = document.querySelector('.popup__zoom-img');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const addPlaceBtn = document.querySelector('.profile__add-btn');

//открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
};

//закрытие попапов
const closePopup = (popup) => {
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
  closePopup(popup);
}

//попап редактирование профиля
function openPopupProfileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
};

//заполнение данных профиля
function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);

};

btnPopupProfileEdit.addEventListener('click', openPopupProfileEdit);
formEditProfile.addEventListener('submit', handleFormSubmit); 

// карточки
const placeContainer = document.querySelector('.places__content');
const placeTemplate = document.querySelector('#place-template');

const createPlaceElement = (placeData) => {
  const placeElement = placeTemplate.content.querySelector('.place').cloneNode(true);

  const placeTitle = placeElement.querySelector('.place__title');
  const placeImage = placeElement.querySelector('.place__image');
  const placeDeleteButton = placeElement.querySelector('.place__delete-btn');
  const placeLikeButton = placeElement.querySelector('.place__like-btn');

  placeTitle.textContent = placeData.name;
  placeImage.src = placeData.link;
  placeTitle.alt = placeData.name;

  const handleDelete = () => {
    placeElement.remove();

  };

  const handleLike = (evt) => {
    evt.target.classList.toggle('place__like-btn_active');

  };

// попап zoom 
const openPopupZoom = () => {
  popupZoomCaption.textContent = placeData.name;
  popupZoomImg.src = placeData.link;
  popupZoomImg.alt = placeData.name;
  openPopup(popupZoom);
}

  placeImage.addEventListener('click', openPopupZoom);
  placeDeleteButton.addEventListener('click', handleDelete);
  placeLikeButton.addEventListener('click', handleLike);

  return placeElement;
};

initialPlaces.forEach((place) => {
  const element = createPlaceElement(place);

  placeContainer.append(element);
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

  const element = createPlaceElement(newPlace);
  placeContainer.prepend(element);

  closePopup(popupAddPlace);
  
  evt.target.reset(); 

  evt.submitter.classList.add('form__submit-btn_disabled')
  evt.submitter.disabled = true; 
  
};

formAddPlace.addEventListener('submit', addNewPlace); 








//закрытие попапов
// function closePopups() {
//   const index = Array.from(popupCloseBtn).indexOf(event.target);

//   popups[index].classList.remove('popup_opened');
// }

// popupCloseBtn.forEach( btn => btn.addEventListener( 'click', closePopups ) );

// const placeNameInput = formElement.querySelector('.form__input_type_place-name');
// const placeImgInput = formElement.querySelector('.form__input_type_place-img');

// карточки вариант
// const placesContent = document.querySelector('.places__content');
// const placeTemplate = document.querySelector('#place-template').content;


// initialCards.forEach(function (element) {
//   const placeElement = placeTemplate.cloneNode(true);

//   placeElement.querySelector('.place__title').textContent = element.name;
//   placeElement.querySelector('.place__image').src = element.link;

//   placeElement.querySelector('.place__like-btn').addEventListener('click', (evt) => {
//   evt.target.classList.toggle('place__like-btn_active')

// }); 

// //выберем кнопку удаления
// const deleteButton = placeElement.querySelector('.place__trash-can');

// // добавим обработчик
// deleteButton.addEventListener('click', function () {
//   const listItem = deleteButton.closest('.place');
// console.log(listItem);

//   listItem.remove();

// });

//   placesContent.append(placeElement);

// });