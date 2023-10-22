export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Метод для получения данных пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      //avatar: this._avatarElement.src,
    };
  }
  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }
}

// export default class UserInfo {
//   constructor({ nameSelector, jobSelector, avatarSelector }) {
//     this._nameElement = document.querySelector(nameSelector);
//     this._jobElement = document.querySelector(jobSelector);
//     this._avatarElement = document.querySelector(avatarSelector);
//   }

//   // Метод для получения данных пользователя
//   getUserInfo() {
//     return {
//       name: this._nameElement.textContent,
//       job: this._jobElement.textContent,
//       avatar: this._avatarElement.src,

//     };
//   }
//   // Принимает новые данные пользователя и добавляет их на страницу
//   setUserInfo({ name, job, avatar }) {
//     this._nameElement.textContent = name;
//     this._jobElement.textContent = job;
//     this._avatarElement.src = avatar;

//   }
// }
