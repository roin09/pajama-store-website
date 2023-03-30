import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAccessToken, getAccessToken } from "../utils/AccessTokenHandler";
import tokenInstance from "./tokenInstance";
import createAuthTokenInstance from "./authTokenInstance";

export const userRegister = async (userdata) => {
  const url = "/user";
  const Instance = tokenInstance();
  try {
    const res = await Instance.post(url, { data: userdata });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (userdata) => {
  const url = "/user/login";
  const Instance = tokenInstance();
  try {
    const loginRes = await Instance.post(url, { data: userdata });
    if (loginRes) {
      // const loginResData = await loginRes.json();

      return loginRes;
    }
    return { result: "fail" };
  } catch (err) {
    console.log(err);
  }
};

export const userAuth = async (userdata) => {
  const url = "/user/refresh";

  const Instance = createAuthTokenInstance();
  try {
    const authRes = await Instance.post(url, userdata);

    return authRes;
  } catch (err) {
    console.log(err);
  }
};
