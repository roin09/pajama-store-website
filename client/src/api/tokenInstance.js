import axios from "axios";

const createTokenInstance = (options) => {
  const root = process.env.REACT_APP_URL;

  const newOptions = {
    baseURL: root,
    withCredentials: true,
  };
  const tokenInstance = axios.create(newOptions);

  return tokenInstance;
};

export default createTokenInstance;
