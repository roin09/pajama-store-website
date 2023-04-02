import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const loginState = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default loginState;
