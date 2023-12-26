import BASE_URL from "./constants";

export const register = (surname, name, middleName, phone, email, password) => {
  return fetch("https://xxxx.backendless.app/api/users/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ surname, name, middleName, phone, email, password }),
  })
    .then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {
        return e;
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
