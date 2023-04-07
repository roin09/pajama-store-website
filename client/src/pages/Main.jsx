import React, { useEffect, useState } from "react";
import styled from "styled-components";
import First from "./First";
import Second from "./Second";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "../hooks/useRouter";
import Forth from "./Forth";
import Header from "../components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getItemInfo } from "../api/itemInfo";
const Main = () => {
  const { routeTo } = useRouter();
  const [option, setOption] = useState(null);
  const [show, setShow] = useState(false);
  const [unfilteredItems, setUnfilteredItems] = useState(null);
  const handleClickButton = (e) => {
    const { name } = e.target;
    if (option !== name) {
      setOption(name);
    } else {
      setOption(null);
    }
  };

  const selectComponent = {
    simple: <First unfilteredItems={unfilteredItems} />,
    girlish: <Second unfilteredItems={unfilteredItems} />,
    cotton: <Forth unfilteredItems={unfilteredItems} />,
  };
  const buttonData = [
    {
      name: "simple",
      id: "sim1",
      text: "Simple",
    },
    {
      name: "girlish",
      id: "girl1",
      text: "Girlish",
    },

    {
      name: "cotton",
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
    if (option !== null) {
      getItemInfo({ category: option })
        .then((res) => {
          console.log(res.data);
          setUnfilteredItems(res.data);
        })
        .then(() => {
          setShow(true);
        });
    } else {
      setShow((prev) => !prev);
    }
  }, [option]);
  return (
    <>
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
          <Grid mobile={1} tablet={2} laptop={3}>
            <div></div>
          </Grid>
          <Grid mobile={3} tablet={4} laptop={6}>
            <BtnContainer>{selectButtons}</BtnContainer>

            {show === true ? selectComponent[option] : null}
          </Grid>

          <Grid mobile={2} tablet={2} laptop={3}>
            <div>
              {" "}
              <button
                onClick={() => {
                  routeTo("item");
                }}
              >
                item
              </button>
            </div>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

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
