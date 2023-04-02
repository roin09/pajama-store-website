import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "loginState", // this key is using to store data in local storage
  storage: sessionStorage, // configurate which stroage will be used to store the data
});

const loginState = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default loginState;
