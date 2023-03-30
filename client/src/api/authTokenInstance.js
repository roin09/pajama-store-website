import axios from "axios";
import { getAccessToken } from "../utils/AccessTokenHandler";

const createAuthTokenInstance = (options) => {
  const root = process.env.REACT_APP_URL;
  const accessToken = getAccessToken();
  const newOptions = {
    baseURL: root,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const tokenInstance = axios.create(newOptions);

  return tokenInstance;
};

export default createAuthTokenInstance;
