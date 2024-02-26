const BASE_URL = "https://bankrotvestnik.ru/api";

class Api {
  constructor(configuration) {
    this._url = configuration.url;
    this._headers = configuration.headers;
  }

  static handleResponse(response) {
    return response.ok ? response.json() : Promise.reject(response);
  }

  createUser(lastName, firstName, secondName, phone, email, password) {
    const body = new FormData();
    body.set("lastName", lastName);
    body.set("firstName", firstName);
    body.set("secondName", secondName);
    body.set("phone", phone);
    body.set("email", email);
    body.set("password", password);
    return fetch(`${this._url}/auth/reg-start`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  confirmUser(userId, registrationCode) {
    const body = new FormData();
    body.set("userID", userId);
    body.set("registrationCode", registrationCode);
    return fetch(`${this._url}/auth/reg-check-code`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  resendCode(userId) {
    const body = new FormData();
    body.set("userID", userId);
    return fetch(`${this._url}/auth/reg-check-code`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
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

  recoveryPassword(email) {
    const body = new FormData();
    body.set("email", email);
    return fetch(`${this._url}/auth/recovery-pass-start`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  newPassword(userId, password, checkword) {
    const body = new FormData();
    body.set("userId", userId);
    body.set("password", password);
    body.set("checkword", checkword);
    return fetch(`${this._url}/auth/recovery-pass-finish`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  getCatalog(params) {
    return fetch(`${this._url}/catalog?` + `${new URLSearchParams(params)}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getFavorites(params) {
    return fetch(
      `${this._url}/favourites?` + `${new URLSearchParams(params)}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    ).then(Api.handleResponse);
  }

  addToFavorites(documentId, folderId) {
    const body = new FormData();
    body.set("documentId", documentId);
    body.set("folderId", folderId);
    return fetch(`${this._url}/favourites/add`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  removeFromFavorites(documentId, folderId) {
    const body = new FormData();
    body.set("documentId", documentId);
    body.set("folderId", folderId);
    return fetch(`${this._url}/favourites/delete`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  moveToFolder(documentId, folderId) {
    const body = new FormData();
    body.set("documentId", documentId);
    body.set("folderId", folderId);
    return fetch(`${this._url}/favourites/replace`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  sendToMail(params) {
    return fetch(`${this._url}/send?` + `${"id=" + params}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getFolders() {
    return fetch(`${this._url}/favourites/menu`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  createFolder(folderName) {
    const body = new FormData();
    body.set("name", folderName);
    return fetch(`${this._url}/favourites/folder`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  renameFolder(newFolderName, folderId) {
    const body = new FormData();
    body.set("folderId", folderId);
    body.set("name", newFolderName);
    return fetch(`${this._url}/favourites/folder/rename`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  deleteFolder(folderId) {
    const body = new FormData();
    body.set("folderId", folderId);
    return fetch(`${this._url}/favourites/folder/delete`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  folderUp(folderId) {
    const body = new FormData();
    body.set("upFolderId", folderId);
    return fetch(`${this._url}/favourites/menu`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  folderDown(folderId) {
    const body = new FormData();
    body.set("downFolderId", folderId);
    return fetch(`${this._url}/favourites/menu`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  sendQuestion(name, phone, email, question) {
    const body = new FormData();
    body.set("name", name);
    body.set("phone", phone);
    body.set("email", email);
    body.set("question", question);
    return fetch(`${this._url}/question`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

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
