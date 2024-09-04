// const BASE_URL = "https://bankrotvestnik.ru/api";
const BASE_URL = "http://beta.bankrotvestnik.ru/api";
const dadataToken = "3c767e62c4d512110cb8e064f16a6d9c30c47974";
import getToken from "./GetToken";

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

  confirmUser(userId, confirmCode) {
    const body = new FormData();
    body.set("userId", userId);
    body.set("confirmCode", confirmCode);
    return fetch(`${this._url}/auth/reg-finish`, {
      method: "POST",
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  resendCode(userId) {
    const body = new FormData();
    body.set("userId", userId);
    return fetch(`${this._url}/auth/reg-repeat-code`, {
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

  getCatalog(page, filters) {
    return fetch(
      `${this._url}/catalog?` +
        `${new URLSearchParams(filters)}` +
        `&count=10&page=${page}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      }
    ).then(Api.handleResponse);
  }

  getFilters(params) {
    return fetch(
      `${this._url}/catalog/filter?` + `${new URLSearchParams(params)}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      }
    ).then(Api.handleResponse);
  }

  getFavorites(folderId, page, filters) {
    return fetch(
      `${this._url}/favourites?` +
        `${new URLSearchParams(folderId)}` +
        `${new URLSearchParams(filters)}` +
        `&count=10&page=${page}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      }
    ).then(Api.handleResponse);
  }

  addToFavorites(documentId, folderId) {
    const body = new FormData();
    body.set("documentId", documentId);
    folderId.forEach((item) => body.append("folders[]", item));
    return fetch(`${this._url}/favourites/add`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  removeFromFavorites(documentId, folderId) {
    const body = new FormData();
    body.set("documentId", documentId);
    if (folderId) {
      body.set("folderId", folderId);
    }
    return fetch(`${this._url}/favourites/delete`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  moveToFolder(documentId, folderId, toFolders) {
    const body = new FormData();
    body.set("documentId", documentId);
    body.append("fromFolders[]", folderId);
    toFolders.forEach((item) => body.append("toFolders[]", item));
    return fetch(`${this._url}/favourites/replace`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  sendToMail(params) {
    return fetch(`${this._url}/send?` + `${"id=" + params}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getFolders() {
    return fetch(`${this._url}/favourites/menu`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
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
        authorization: `Bearer ${getToken()}`,
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
        authorization: `Bearer ${getToken()}`,
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
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  sendFolders(foldersList) {
    const body = new FormData();
    foldersList.forEach((item) => body.append("folders[]", item.id));
    return fetch(`${this._url}/favourites/folders/order`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  sendQuestion(formData) {
    return fetch(`${this._url}/ask-question`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: formData,
    }).then(Api.handleResponse);
  }

  changePassword(password, newPassword) {
    const body = new FormData();
    body.set("oldPwd", password);
    body.set("newPwd", newPassword);
    return fetch(`${this._url}/change-pwd`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body,
    }).then(Api.handleResponse);
  }

  getUser() {
    return fetch(`${this._url}/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  changeUser(formData) {
    return fetch(`${this._url}/change-user`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: formData,
    }).then(Api.handleResponse);
  }

  getDadataCompany(query) {
    return fetch(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + dadataToken,
        },
        body: JSON.stringify({ query: query }),
      }
    ).then(Api.handleResponse);
  }

  getDadataAddress(query) {
    return fetch(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + dadataToken,
        },
        body: JSON.stringify({ query: query }),
      }
    ).then(Api.handleResponse);
  }

  getRates() {
    return fetch(`${this._url}/tariff`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  payTariff(id, period) {
    return fetch(`${this._url}/payment-tariff?id=${id}&period=${period}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  confirmPayment(paymentId) {
    return fetch(`${this._url}/payment-tariff-status?paymentId=${paymentId}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  requestDemoAccess(formData) {
    return fetch(`${this._url}/request-demo-access`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
      body: formData,
    }).then(Api.handleResponse);
  }

  getPolicy() {
    return fetch(`${this._url}/content/privacy-policy`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getContacts() {
    return fetch(`${this._url}/contacts`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getQA() {
    return fetch(`${this._url}/qa`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getNews(page) {
    return fetch(`${this._url}/news?page=` + `${page}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getNewsDetail(id) {
    return fetch(`${this._url}/news-detail?id=` + `${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    }).then(Api.handleResponse);
  }

  getWiki(page, params) {
    return fetch(
      `${this._url}/wiki?page=` + `${page}&` + `${new URLSearchParams(params)}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      }
    ).then(Api.handleResponse);
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
