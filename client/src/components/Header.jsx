import Grid from "@mui/material/Unstable_Grid2";
import styled from "styled-components";
import { useRouter } from "../hooks/useRouter";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import loginState from "../atom/loginState";
import userIdState from "../atom/userIdState";
import { removeAccessToken } from "../utils/AccessTokenHandler";
const Header = ({ isShow }) => {
  const { routeTo } = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const handleLogout = async () => {
    await removeAccessToken();
    setIsLogin(false);
    setUserId(null);
    window.location.reload();
  };
  return (
    <Grid container spacing={1}>
      <Grid xs={10} sm={10} md={10} lg={10} xl={9}>
        <div></div>
      </Grid>
      <Grid xs={2} sm={2} md={2} lg={2} xl={3}>
        {isShow ? (
          <UserBtnContainer>
            <UserBtn>Mypage</UserBtn>
            <UserBtn onClick={handleLogout}>Logout</UserBtn>
          </UserBtnContainer>
        ) : (
          <UserBtnContainer>
            <UserBtn
              onClick={() => {
                routeTo("register");
              }}
            >
              Signup
            </UserBtn>
            <UserBtn
              onClick={() => {
                routeTo("login");
              }}
            >
              Login
            </UserBtn>
          </UserBtnContainer>
        )}
      </Grid>
    </Grid>
  );
};
const UserBtnContainer = styled.div`
  display: flex;
  padding: 1rem;
`;
const DefaultButton = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  letter-spacing: 0.2rem;
  cursor: pointer;
  background-color: black;
  color: white;
  margin: 0.5rem;
  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(90%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
  &:focus {
    filter: brightness(90%);

    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }
`;
const UserBtn = styled(DefaultButton)`
  font-size: 0.6rem;
`;
export default Header;
