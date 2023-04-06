import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userIdState", // this key is using to store data in local storage
  storage: sessionStorage, // configurate which stroage will be used to store the data
});

const userIdState = atom({
  key: "userId",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// const userState = selector({
//   key: "userInfo",
//   get: ({ get }) => {
//     const isLogin = get(loginState);
//     const userId = get(userIdState);
//     return { isLogin, userId };
//   },
//   set: ({ set }, value) => {
//     if (value instanceof DefaultValue) {
//       set(loginState, value);
//       set(userIdState, value);
//       return;
//     }
//     set(loginState, value.isLogin);
//     set(userIdState, value.userId);
//   },
// });
export default userIdState;
