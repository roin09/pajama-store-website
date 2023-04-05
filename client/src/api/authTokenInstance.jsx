import axios from "axios";
import { getAccessToken, saveAccessToken } from "../utils/AccessTokenHandler";

const createAuthTokenInstance = (options) => {
  const root = process.env.REACT_APP_URL;
  const accessToken = getAccessToken();

  const newOptions = {
    baseURL: root,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  };
  const tokenInstance = axios.create(newOptions);

  tokenInstance.interceptors.response.use(
    async function (response) {
      if (response.status === 201) {
        const new_access_token = response.data.data.accessToken;
        await saveAccessToken(new_access_token);
        console.log("new access token issued");
      }
      return response;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );
  return tokenInstance;
};

export default createAuthTokenInstance;
