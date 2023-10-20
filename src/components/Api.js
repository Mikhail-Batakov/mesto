class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    

  }

   //Проверяет ответ от сервера на предмет успешности запроса.
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };   
  // Выполняет сетевой запрос с использованием fetch и проверяет ответ с помощью _checkResponse.
  // Возвращает результат запроса в виде промиса
  _request(baseUrl, options) {
    return fetch(baseUrl, options)
      .then(this._checkRes);

    
  }

  getUserInfo() {
    // ...
  }

  getInitialCards() {
    // ...
  }





}


// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
//   headers: {
//     authorization: '3edcdea5-b130-42c1-9a7c-9c803e968261',
//     'Content-Type': 'application/json'
//   }
// }); 