const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_job');

function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');

}

function closePopup() {

  popup.classList.remove('popup_opened');

}

openPopupBtn.addEventListener('click', openPopup);  
popupCloseBtn.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 
  
// // кнопка Like
// // let $like = document.querySelector('.place__like-btn_active');
// // $like.addEventListener( 'click', () => 
// // $like.classList.toggle('place__like-btn_active') )


