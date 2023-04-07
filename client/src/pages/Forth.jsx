import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./first.css";
import { cottonProduct } from "../Data/products";
// Swiper에서 가져올 모듈들
import { EffectCoverflow, Pagination } from "swiper";

const Forth = () => {
  const [content, setContent] = useState(null);
  const [show, setShow] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const handleContent = (name) => {
    setContent(name);
  };
  const handleItems = (name) => {
    const items = cottonProduct.filter((el) => el.category == name);
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
  // const selectComponent = {
  //   s: [s1, s2, s3, s4, s5, s6, s7, s8, s9],
  //   l: [l1, l2, l3, l4, l5, l6, l7],
  // };
  const buttonData = [
    {
      name: "Short",
      id: "f",
      text: "Short",
    },
    {
      name: "Long",
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
          ? filteredItems?.map((data, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img
                    className="swiper-img"
                    key={idx}
                    alt={idx}
                    src={data.imgs}
                    id={data.id}
                  />
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
