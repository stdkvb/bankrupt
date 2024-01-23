const BASE_URL = "https://bankrotvestnik.ru/api";

class Api {
  constructor(configuration) {
    this._url = configuration.url;
    this._headers = configuration.headers;
  }

  static handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  loginUser(login, password) {
    const body = new FormData();
    body.set("login", login);
    body.set("password", password);
    return fetch(`${this._url}/auth`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  getCatalog() {
    return fetch(`${this._url}/catalog`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  // createUser(surname, name, middleName, phone, email, password) {
  //   console.log(surname, name, middleName, phone, email, password);
  //   return fetch(`${this._url}/register`, {
  //     method: "POST",
  //     headers: this._headers,
  //     credentials: "include",
  //     body: JSON.stringify({
  //       surname,
  //       name,
  //       middleName,
  //       phone,
  //       email,
  //       password,
  //     }),
  //   }).then(Api.handleResponse);
  // }

  // logoutUser() {
  //   return fetch(`${this._url}/signout`, {
  //     method: "POST",
  //     headers: this._headers,
  //     credentials: "include",
  //   }).then(Api.handleResponse);
  // }

  // getUserInfo() {
  //   return fetch(`${this._url}/users/me`, {
  //     method: "GET",
  //     headers: this._headers,
  //     credentials: "include",
  //   }).then(Api.handleResponse);
  // }

  // updateUser(name, email) {
  //   return fetch(`${this._url}/users/me`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     credentials: "include",
  //     body: JSON.stringify({ name, email }),
  //   }).then(Api.handleResponse);
  // }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
