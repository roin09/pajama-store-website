import styled from "styled-components";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Lazy loading
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { DefaultBtn } from "../components/DefaultBtn";
import { useEffect, useState } from "react";
const Detailpage = (props) => {
  const { open, close, selectedItemInfo } = props;
  const item = {
    itemName: selectedItemInfo.itemName,
    id: selectedItemInfo.id,
    price: selectedItemInfo.price,
    brand: selectedItemInfo.brand,
    sale: selectedItemInfo.sale,
  };
  const [salePrice, setSalePrice] = useState("");
  const [sale, setSale] = useState(item.sale);
  const [price, setPrice] = useState(item.price);
  const saleCal = (price, sale) => {
    const iPrice = parseInt(price);
    const iSale = parseInt(sale);
    const result = (iPrice * (100 - iSale)) / 100;
    return String(result);
  };

  useEffect(() => {
    const result = saleCal(price, sale);
    setSalePrice(result);
  }, [item]);
  return (
    <Modal popup={open ? "popup" : ""} onClick={close}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <Container onClick={(e) => e.stopPropagation()}>
              <ImgBox className="item">
                <LazyLoadImage
                  alt={item.itemName}
                  effect="blur"
                  className="item-img"
                  height={250}
                  width={300}
                  src={
                    process.env.REACT_APP_CLOUD_URL + item.id + "?quality=65"
                  }
                />
              </ImgBox>
              <InfoBox className="item">
                <InfoDiv className="info-item info-brand">{item.brand}</InfoDiv>
                <InfoDiv className="info-item info-name">
                  {item.itemName}
                </InfoDiv>
                <InfoDiv className="info-item info-saleprice">
                  {item.price}sale
                </InfoDiv>
                <InfoDiv className="info-item">
                  <SaleDiv className="price-item info-sale">{sale}%</SaleDiv>
                  <SaleDiv className="price-item info-price">
                    {salePrice} 원
                  </SaleDiv>
                </InfoDiv>
                <InfoDiv className="info-item info-icon">
                  <div className="fa-icon infodiv-item">
                    <FontAwesomeIcon
                      icon={icon({ name: "heart", style: "regular" })}
                    />
                  </div>
                  <div className="fa-icon infodiv-item">
                    <FontAwesomeIcon
                      icon={icon({ name: "cart-plus", style: "solid" })}
                    />
                  </div>

                  <div className="infodiv-item">
                    <DetailBtn>구매하기</DetailBtn>
                  </div>
                </InfoDiv>
              </InfoBox>
            </Container>
          </main>
          <footer></footer>
        </section>
      ) : null}
    </Modal>
  );
};
const Modal = styled.div`
display: ${(props) => (props.popup ? "flex" : "none")};
position: fixed;
align-items: center;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 99;
background-color: rgba(0, 0, 0, 0.6);
animation: modal-bg-show 0.3s;
}
button {
outline: none;
cursor: pointer;
border: 0;
}
section {
width: 90%;
max-width: 450px;
margin: 0 auto;
border-radius: 0.3rem;
background-color: #fff;

animation: modal-show 0.3s;
overflow: hidden;
}
section > header {
position: relative;
padding: 16px 64px 16px 16px;
background-color: white;
font-weight: 700;
}
section > header button {
position: absolute;
top: 15px;
right: 15px;
width: 30px;
font-size: 21px;
font-weight: 700;
text-align: center;
color: #999;
background-color: transparent;
}
section > main {
padding: 16px;
border-color:none;

}
section > footer {
text-align: right;
}
section > footer button {
padding: 6px 12px;
color: #fff;
background-color: #6c757d;
border-radius: 5px;
font-size: 13px;
}
@keyframes modal-show {
from {
  opacity: 0;
  margin-top: -50px;
}
to {
  opacity: 1;
  margin-top: 0;
}
}
@keyframes modal-bg-show {
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  .item:nth-child(1) {
    flex: 1;
  }
  .item:nth-child(2) {
    flex: 1;
  }
`;
const ImgBox = styled.div`
  .item-img {
    width: 100%;
    height: 100%;
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  align-items: flex-start;
  .info-item:nth-child(1) {
    flex: 0.8;
  }
  .info-item:nth-child(2) {
    flex: 1;
  }
  .info-item:nth-child(3) {
    flex: 0.4;
  }
  .info-item:nth-child(4) {
    flex: 1;
  }
  .info-item:nth-child(5) {
    flex: 1.7;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  .info-name {
    color: black;
  }

  .info-icon {
    align-items: flex-start;
    justify-content: center;
  }
  .fa-icon {
    margin: 0.6rem 0.3rem 0.3rem 0rem;
  }
  .infodiv-item:nth-child(1) {
    flex: 0.2;
  }
  .infodiv-item:nth-child(2) {
    flex: 0.2;
  }
  .infodiv-item:nth-child(3) {
    flex: 1;
  }
`;
const SaleDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  .price-item:nth-child(1) {
    flex: 1;
  }
  .price-item:nth-child(2) {
    flex: 2;
  }
`;
const DetailBtn = styled(DefaultBtn)`
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  font-size: 0.7rem;
`;
export default Detailpage;
