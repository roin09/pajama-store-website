import React, { useEffect, useState } from "react";
import styled from "styled-components";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Grid from "@mui/material/Unstable_Grid2";
import background2 from "./img/background2.jpeg";
import { useRouter } from "../hooks/useRouter";
import Forth from "./Forth";
const Main = () => {
  const { routeTo } = useRouter();
  const [option, setOption] = useState(null);
  const [show, setShow] = useState(false);

  const handleClickButton = (e) => {
    const { name } = e.target;
    if (option !== name) {
      setOption(name);

      setShow(true);
    } else {
      setOption(name);

      setShow((prev) => !prev);
    }
  };

  const selectComponent = {
    first: <First />,
    second: <Second />,
    third: <Third />,
    forth: <Forth />,
  };
  const buttonData = [
    {
      name: "first",
      id: "sim1",
      text: "Simple",
    },
    {
      name: "second",
      id: "girl1",
      text: "Girlish",
    },

    {
      name: "forth",
      id: "co1",
      text: "Cotton",
    },
    // {
    //   name: "third",
    //   id: "char1",
    //   text: "Character",
    // },
  ];
  const selectButtons = buttonData.map((data) => (
    <DefaultButton onClick={handleClickButton} name={data.name} key={data.id}>
      {data.text}
    </DefaultButton>
  ));
  useEffect(() => {
    if (show === false) {
      setOption(null);
    }
  }, [show]);
  return (
    <>
      <BgImage>
        <BlurBox>
          <Grid container spacing={1}>
            <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
              <div></div>
            </Grid>
            <Grid xs={6} sm={8} md={8} lg={8} xl={7}>
              <BtnContainer>{selectButtons}</BtnContainer>

              {show === true ? selectComponent[option] : null}
            </Grid>

            <Grid xs={2} sm={2} md={2} lg={2} xl={3}>
              <UserBtnContainer>
                <UserBtn
                  onClick={() => {
                    routeTo("login");
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
            </Grid>
          </Grid>
        </BlurBox>
      </BgImage>
    </>
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
`;
const Gridbox = styled.div``;
const MainBox = styled.div`
  display: flex;
  padding: 1rem 1.5rem 1rem 1.5rem;
  align-items: center;
  flex-direction: column;
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
`;
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
  background-color: rgba(0, 0, 0, 0);
  color: black;

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
const Content = styled.div`
  display: flex;
  width: 30rem;
  height: 10rem;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

export default Main;
