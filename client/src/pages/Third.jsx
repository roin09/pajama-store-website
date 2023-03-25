import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./first.css";
// Swiper에서 가져올 모듈들
import { EffectCoverflow, Pagination } from "swiper";
import char1 from "./img/char1.png";
import char2 from "./img/char2.png";
import char3 from "./img/char3.png";
const Third = () => {
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
    char: [char1, char2, char3],
  };
  const buttonData = [
    {
      name: "char",
      id: "c",
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
  background-color: rgba(0, 0, 0, 0.2);
  color: #333333;
  margin: 2rem 0.8rem 2rem 0.8rem;
  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
  &:focus {
    filter: brightness(90%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
`;

export default Third;
