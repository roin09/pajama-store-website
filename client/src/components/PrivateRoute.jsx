import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import loginState from "../atom/loginState";
import { useRouter } from "../hooks/useRouter";
import Login from "../pages/Login";
const PrivateRoute = ({ children }) => {
  const { routeTo } = useRouter();
  const isLogin = useRecoilValue(loginState);
  const [isShowing, setIsShowing] = useState(null);
  const navtoLogin = () => {
    if (isLogin) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
      routeTo("/react/login");
    }
  };
  useEffect(() => {
    navtoLogin();
  }, []);
  return isShowing ? <div className="private-div"> {children} </div> : null;
};

export default PrivateRoute;
