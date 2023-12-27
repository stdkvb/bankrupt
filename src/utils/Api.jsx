const BASE_URL = "https://human.wptt.ru/api";

class Api {
  constructor(configuration) {
    this._url = configuration.url;
    this._headers = configuration.headers;
  }

  static handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  createUser(surname, name, middleName, phone, email, password) {
    console.log(surname, name, middleName, phone, email, password);
    return fetch(`${this._url}/register`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        surname,
        name,
        middleName,
        phone,
        email,
        password,
      }),
    }).then(Api.handleResponse);
  }

  loginUser(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then(Api.handleResponse);
  }

  logoutUser() {
    return fetch(`${this._url}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(Api.handleResponse);
  }

  updateUser(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ name, email }),
    }).then(Api.handleResponse);
  }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
