import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./first.css";

// Swiper에서 가져올 모듈들
import { EffectCoverflow, Pagination } from "swiper";

import s1 from "./img/s.jpeg";
import s2 from "./img/s2.jpeg";
import s3 from "./img/s3.jpeg";
import s4 from "./img/s4.jpeg";
import s5 from "./img/s5.jpeg";
import s6 from "./img/s6.jpeg";
import s7 from "./img/s7.jpeg";
import s8 from "./img/s8.jpeg";
import s9 from "./img/s9.jpeg";

import l1 from "./img/l1.jpeg";
import l2 from "./img/l2.jpeg";
import l3 from "./img/l3.jpeg";
import l4 from "./img/l4.jpeg";
import l5 from "./img/l5.jpeg";
import l6 from "./img/l6.jpeg";
import l7 from "./img/l7.jpeg";

const Forth = () => {
  const [content, setContent] = useState(null);
  const [show, setShow] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const handleClickButton = (e) => {
    const { name } = e.target;
    if (content !== name) {
      setContent(name);
      setShow(true);
    } else {
      setContent(name);
      setShow((prev) => !prev);
    }
  };
  const selectComponent = {
    s: [s1, s2, s3, s4, s5, s6, s7, s8, s9],
    l: [l1, l2, l3, l4, l5, l6, l7],
  };
  const buttonData = [
    {
      name: "s",
      id: "f",
      text: "Short",
    },
    {
      name: "l",
      id: "s",
      text: "Long",
    },
  ];
  const selectButtons = buttonData.map((data) => (
    <DefaultButton onClick={handleClickButton} name={data.name} key={data.id}>
      {data.text}
    </DefaultButton>
  ));
  useEffect(() => {
    if (show === false) {
      setContent(null);
    }
  }, [show]);
  return (
    <>
      <Container>{selectButtons}</Container>

      <Swiper
        onSwiper={setSwiper}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {show === true
          ? selectComponent[content]?.map((data, idx) => (
              <SwiperSlide key={idx}>
                <img key={idx} alt={idx} src={data} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  display: flex;

  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const DefaultButton = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.1rem;
  background-color: rgba(0, 0, 0, 0);
  color: #333333;
  margin: 1rem 0.8rem 1rem 0.8rem;
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
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
`;
// const InnerContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   box-sizing: border-box;
//   background-color: rgba(255, 255, 255, 0.348);
// `;

export default Forth;
