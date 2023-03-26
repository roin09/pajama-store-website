import React, { useEffect, useState } from "react";
import styled from "styled-components";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import GridLayout from "react-grid-layout";
import background2 from "./img/background2.jpeg";
import { useRouter } from "../hooks/useRouter";
import Forth from "./Forth";
const Main = () => {
  const { routeTo } = useRouter();
  const [option, setOption] = useState(null);
  const [show, setShow] = useState(false);
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 1, y: 0, w: 1, h: 1 },
  ];
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
          <GridLayout
            className="layout"
            layout={layout}
            rowHeight={300}
            width={1300}
            cols={2}
          >
            <div key="a">
              <MainBox>
                <Container>{selectButtons}</Container>

                {show === true ? selectComponent[option] : null}
              </MainBox>
            </div>
            <div key="b">
              <MainBox>
                <Container2>
                  <DefaultButton
                    onClick={() => {
                      routeTo("login");
                    }}
                  >
                    Register
                  </DefaultButton>
                  <DefaultButton
                    onClick={() => {
                      routeTo("login");
                    }}
                  >
                    Login
                  </DefaultButton>
                </Container2>
              </MainBox>
            </div>
          </GridLayout>
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
const MainBox = styled.div`
  display: flex;
  padding: 1rem 1.5rem 1rem 1.5rem;
  align-items: center;
  flex-direction: column;
`;
const Container = styled.div`
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
`;
const Container2 = styled.div`
  justify-content: flex-end;
  align-items: flex-end;
  padding: 1rem;
  margin: 0 auto;
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

const Content = styled.div`
  display: flex;
  width: 30rem;
  height: 10rem;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

export default Main;
