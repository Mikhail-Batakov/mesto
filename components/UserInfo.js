export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}






















// export default class UserInfo {
//   constructor({ nameInputSelector, jobInputSelector }) {
//     this._nameInputSelector = document.querySelector(nameInputSelector);
//     this._jobInputSelector = document.querySelector(jobInputSelector);

//   }
//   // Метод для получения данных пользователя
//   getUserInfo() {
//     // Возвращает объект с текущими данными пользователя
//     return {
//       profileName: this._nameInputSelector.textContent,
//       profileJob: this._jobInputSelector.textContent
//     }
  
//   }
// // Принимает новые данные пользователя и добавляет их на страницу
// setUserInfo({ profileName, profileJob }) {
//   this._nameInputSelector.textContent = profileName;
//   this._jobInputSelector.textContent = profileJob;

    
// }

// }