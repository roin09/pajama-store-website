import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = async (name, token) => {
  await cookies.set(name, token, { path: "/" });
};

export const getCookie = (name) => {
  return cookies.get(name);
};
