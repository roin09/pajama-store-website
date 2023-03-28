import Grid from "@mui/material/Unstable_Grid2";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { userLogin } from "../api/userInfo";
import background2 from "./img/background2.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { saveAccessToken } from "../utils/AccessTokenHandler";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const loginResult = await userLogin(data);
      if (loginResult) {
        const token = loginResult.data.data.accessToken;
        saveAccessToken(token);
        console.log(token);
      }

      return alert("success");
    } catch (err) {
      return err;
    }
  };
  const handleUserId = register("userId", {
    required: { value: true, message: "please enter your ID" },
    pattern: {
      value: process.env.REACT_APP_NAME_REGEX,
      message: "wrong ID pattern",
    },
  });

  const handlePassword = register("password", {
    required: { value: true, message: "please enter your password" },
    pattern: {
      value: process.env.REACT_APP_PASSWORD_REGEX,
      message: "wrong password pattern",
    },
  });

  return (
    <BgImage>
      <BlurBox>
        <Grid container spacing={1}>
          <Grid xs={12} sm={10} md={10} lg={10} xl={10}>
            <InputDiv>
              <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="username-form">
                  <InputText
                    name="userId"
                    type="text"
                    error={errors.userId?.message === undefined ? "" : "error"}
                    {...handleUserId}
                  />
                  <div className="invalid-feedback">
                    {errors.userId?.message}
                  </div>
                </div>
                <div className="password-form">
                  <InputText
                    name="password"
                    type="password"
                    error={
                      errors.password?.message === undefined ? "" : "error"
                    }
                    {...handlePassword}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
                <InputBtn disabled={isSubmitting}>Login</InputBtn>
              </form>
            </InputDiv>
          </Grid>
        </Grid>
      </BlurBox>
    </BgImage>
  );
};
const BgImage = styled.div`
  background-image: url(${background2});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: calc(var(--vw, 1vw) * 100);
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BlurBox = styled.div`
  backdrop-filter: blur(10px);
  width: calc(var(--vw, 1vw) * 95);
  height: calc(var(--vh, 1vh) * 95);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 20rem;
  .username-form,
  .password-form,
  .user-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
`;
const InputText = styled.input`
  border: 1px solid rgb(186, 191, 196);
  border-radius: 3px;
  padding-left: 10px;
  border-color: ${(props) => (props.error ? "#de4f54" : "")};
  box-shadow: ${(props) =>
    props.error ? "0 0 0 4px #f7e1e1, 0 0 0 4px #f7e1e1" : ""};
  &:focus {
    outline: none;
    border-color: ${(props) => (props.error ? "#de4f54" : "#6bbbf7")};
    border-width: 1px;
    box-shadow: ${(props) =>
      props.error
        ? "0 0 0 4px #f7e1e1, 0 0 0 4px #f7e1e1"
        : "0 0 0 4px #cce9fe, 0 0 0 4px #cce9fe"};
  }
  .error-icon {
    color: #d0393e;
  }
`;
const InputBtn = styled.button`
  border-radius: 3px;
  border: 0px;
  padding: 2px 9px;
  transition: all 0.4s ease 0s;
  font-size: 0.6rem;
  color: white;
  background-color: black;
  width: 50%;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;

export default Login;
