const getCookieValue = (key: string | undefined): string => {
  const cookieKey = `${key}=`;
  let result = "";
  const cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i += 1) {
    if (cookieArr[i][0] === " ") cookieArr[i] = cookieArr[i].substring(1);
    if (cookieArr[i].indexOf(cookieKey) === 0) {
      result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
      return result;
    }
  }
  return result;
};
const removeCookieValue = (key: string | undefined) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
export { getCookieValue, removeCookieValue };
