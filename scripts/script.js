
const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn_popup-open');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const formSubmitBtn = document.querySelector('.form__submit-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.form'); 
const nameInput = formElement.querySelector('.form__input_type_name');  
const jobInput = formElement.querySelector('.form__input_type_job');

function openPopup() {
  popup.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

}

function closePopup(evt) {
  const isOverlay = evt.target.classList.contains('popup');
  const isCloseBtn = evt.target.classList.contains('popup__close-btn');
  const isSubmitBtn = evt.target.classList.contains('form__submit-btn');

if (isOverlay || isCloseBtn || isSubmitBtn) {

  popup.classList.remove('popup_open');
}
}

openPopupBtn.addEventListener('click', openPopup);  
popup.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

}

formElement.addEventListener('submit', handleFormSubmit); 

// кнопка Like
// let $like = document.querySelector('.place__like-btn_active');
// $like.addEventListener( 'click', () => 
// $like.classList.toggle('place__like-btn_active') )