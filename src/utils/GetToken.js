const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  const item = JSON.parse(token);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem("token");
    return null;
  }
  return item.value;
};
export default getToken;
