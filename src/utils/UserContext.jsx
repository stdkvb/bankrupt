import { createContext, useState } from "react";

export const UserContext = createContext({});

// const defaultUser = {
//   lastName: "Фамилия",
//   firstName: "Имя",
//   secondName: "Отчество",
//   phone: "+79999999999",
//   email: "email@email.com",
//   legalEntity: true,
//   companyName: "",
//   companyAddress: "",
//   mailingAddress: "",
//   inn: "",
//   rs: "",
//   ks: "",
//   bik: "",
//   ogrnip: "",
//   okved: "",
//   okpo: "",
//   okato: "",
//   okogu: "",
//   okfs: "",
//   okopf: "",
//   notification: {
//     type: "error",
//     message: "Действие вашего тарифа заканчивается 08.11.2023",
//   },
// };

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
