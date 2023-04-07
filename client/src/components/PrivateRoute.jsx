import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import loginState from "../atom/loginState";
import userIdState from "../atom/userIdState";
import Login from "../pages/Login";
import Header from "./Header";
import { getCurrentUserInfo, getHeaderInfo } from "../api/userInfo";
import { backgroundImg } from "../assets/imgfiles";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const PrivateRoute = ({ children }) => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [isShow, setIsShow] = useState(false);
  // const setHeaderInfo = async () => {
  //   if (isLogin) {
  //     const headerRes = await getHeaderInfo({ testId: headerId });
  //     if (headerRes.status === 201) {
  //       setIsShowing(true);
  //       return console.log("access token saved");
  //     } else if (headerRes.status === 200) {
  //       setIsShowing(true);
  //       return console.log("access token is valid");
  //     }
  //   } else {
  //     setIsShowing(false);
  //     return console.log("Not authenticated user");
  //   }
  // };

  const fetchUserProfile = useCallback(async () => {
    if (userId) {
      const userProfileRes = await getCurrentUserInfo();
      if (userProfileRes.status === 200 || userProfileRes.status === 201) {
        setIsLogin(true);
        setIsShow(true);
        return console.log("user auth success");
      } else {
        setIsLogin(false);
        return;
      }
    } else {
      setIsLogin(false);
      return;
    }
  }, []);
  useEffect(() => {
    fetchUserProfile();
  }, [isLogin]);

  return (
    <BgImage>
      <BlurBox>
        <div className="private-div">
          <ThemeProvider
            theme={createTheme({
              breakpoints: {
                values: {
                  laptop: 1024,
                  tablet: 640,
                  mobile: 0,
                  desktop: 1280,
                },
              },
            })}
          >
            <Grid container spacing={{ mobile: 1, tablet: 2, laptop: 3 }}>
              <Grid mobile={1} tablet={1} laptop={3.5}>
                <div></div>
              </Grid>
              <Grid mobile={1} tablet={4} laptop={6}>
                <div></div>
              </Grid>
              <Grid mobile={4} tablet={3} laptop={2.5}>
                <Header isShow={isShow} />
              </Grid>
            </Grid>
          </ThemeProvider>
          {children}
        </div>
      </BlurBox>
    </BgImage>
  );
};
const BgImage = styled.div`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: calc(var(--vw, 1vw) * 100);
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlurBox = styled.div`
  backdrop-filter: blur(10px);
  width: calc(var(--vw, 1vw) * 95);
  height: calc(var(--vh, 1vh) * 95);
`;
export default PrivateRoute;
