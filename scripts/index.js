import { initialPlaces } from './constants.js';

//const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const btnPopupProfileEdit = document.querySelector('.profile__edit-btn');
//const popupCloseBtn = document.querySelector('.popup__close-btn');
const popupEditProfileCloseBtn = document.querySelector('.popup__close-btn_type_edit-profile');
const popupAddPlaceCloseBtn = document.querySelector('.popup__close-btn_type_add-place');
const popupZoomCloseBtn = document.querySelector('.popup__close-btn_type_zoom');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formEditProfile = document.querySelector('.form');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

const formAddPlace = document.querySelector('.form_type_add-place');
const placeNameInput = formAddPlace.querySelector('.form__input_type_place-name');
const placeImgInput = formAddPlace.querySelector('.form__input_type_place-img');


const popupZoom = document.querySelector('.popup_type_zoom');
const popupZoomCaption = document.querySelector('.popup__zoom-caption');
const popupZoomImg = document.querySelector('.popup__zoom-img');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const addPlaceBtn = document.querySelector('.profile__add-btn');

//открытие попапов
function openPopup(popupName) {
  popupName.classList.add('popup_opened');

};

//закрытие попапов
function closepopup(popupName) {
  popupName.classList.remove('popup_opened');

};

//попап редактирование профиля
function openPopupProfileEdit() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);

};

//Закрытие попапа редактирование профиля
const closePopupProfileEdit = () => {
  closepopup(popupEditProfile);

};

popupEditProfileCloseBtn.addEventListener('click', closePopupProfileEdit);

//заполнение данных профиля
function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closepopup(popupEditProfile);

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

const closePopupZoom = () => {
  closepopup(popupZoom);

};

  popupZoomCloseBtn.addEventListener('click', closePopupZoom);


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

//закрытие попапа редактирование профиля
const closePopupAddPlace = () => {
  closepopup(popupAddPlace);

};
addPlaceBtn.addEventListener('click', openPopupAddPlace);
popupAddPlaceCloseBtn.addEventListener('click', closePopupAddPlace);

 // добавление новых карточек
const addNewPlace = (evt) => {
  evt.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeImgInput.value,
  };

  const element = createPlaceElement(newPlace);
  placeContainer.prepend(element);

  closepopup(popupAddPlace);
  
  evt.target.reset(); 
  
};

formAddPlace.addEventListener('submit', addNewPlace); 










//закрытие попапов
// function closePopups() {
//   const index = Array.from(popupCloseBtn).indexOf(this);

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