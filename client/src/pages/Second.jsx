import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./first.css";

// Swiper에서 가져올 모듈들
import { EffectCoverflow, Pagination } from "swiper";
import { girlProduct } from "../Data/products";
import girls1 from "./img/girls1.png";
import girls2 from "./img/girls2.png";
import girls3 from "./img/girls3.png";
import girls4 from "./img/girls4.png";
import girls5 from "./img/girls5.png";

import girls6 from "./img/girls6.png";
import girls7 from "./img/girls7.png";

import girlo1 from "./img/girlo1.png";
import girlo2 from "./img/girlo2.png";
import girlo3 from "./img/girlo3.png";
import girlo4 from "./img/girlo4.png";
import girlo5 from "./img/girlo5.png";
const Second = () => {
  const [content, setContent] = useState(null);
  const [show, setShow] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const handleContent = (name) => {
    setContent(name);
  };
  const handleItems = (name) => {
    const items = girlProduct.filter((el) => el.category == name);
    setFilteredItems(items);
  };
  const handleClickButton = async (e) => {
    const { name } = e.target;
    if (content !== name) {
      await handleContent(name);
      await handleItems(name);
      setShow(true);
    } else {
      setShow((prev) => !prev);
    }
  };

  const selectComponent = {
    girls: [girls1, girls2, girls3, girls4, girls5],
    girll: [girls6, girls7],
    girlo: [girlo1, girlo2, girlo3, girlo4, girlo5],
  };
  const buttonData = [
    {
      name: "Short",
      id: "gs",
      text: "Short",
    },
    {
      name: "Long",
      id: "gl",
      text: "Long",
    },
    {
      name: "Dress",
      id: "go",
      text: "Dress",
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
          ? filteredItems?.map((data, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img key={idx} alt={idx} src={data.imgs} id={data.id} />
                </SwiperSlide>
              );
            })
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
  letter-spacing: 0.1rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  color: #333333;
  margin: 1rem 0.8rem 1rem 0.8rem;
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

export default Second;
