import { useState } from "react";
import Cookies from "js-cookie";

const useCookies = (cookieName) => {
  const getCookie = () => {
    const cookieValue = Cookies.get(cookieName);
    return cookieValue ? JSON.parse(cookieValue) : null;
  };

  const [cookie, setCookieState] = useState(getCookie());

  const setCookie = (value, options = {}) => {
    Cookies.set(cookieName, JSON.stringify(value), options);
    setCookieState(value);
  };

  const removeCookie = (options = {}) => {
    Cookies.remove(cookieName, options);
    setCookieState(null);
  };

  return [cookie, setCookie, removeCookie];
};

export default useCookies;
