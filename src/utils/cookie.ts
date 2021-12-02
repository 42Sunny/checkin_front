const getCookieValue = (key: string | undefined) => {
  if (key === undefined) return "";

  return document.cookie
    .split(";")
    .filter((cookie) => cookie.includes(key))
    .join("")
    .split("=")[1];
};

const removeCookieValue = (key: string | undefined) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
export { getCookieValue, removeCookieValue };
