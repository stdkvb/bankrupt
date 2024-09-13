const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const item = JSON.parse(token);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem("token");
      return null;
    }

    return item.value;
  } catch (e) {
    console.error("Ошибка парсинга токена:", e);
    return null;
  }
};

export default getToken;
