import axios from "axios";

const root = process.env.REACT_APP_URL;
const newOptions = {
  basicURL: root,
};
const tokenInstance = axios.create(newOptions);

export default tokenInstance;
