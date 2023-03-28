import axios from "axios";
import { useNavigate } from "react-router-dom";
const URL = "http://localhost:4000";

export const userRegister = async (data) => {
  try {
    const req = JSON.stringify(data);
    const res = await axios.post(`${URL}/user`, req, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (data) => {
  try {
    const req = JSON.stringify(data);
    const res = await axios.post(`${URL}/user/login`, req, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
