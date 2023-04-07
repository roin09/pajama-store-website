import styled from "styled-components";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconEmptyHeart } from "../assets/imgfiles";
import { iconEmptyCart } from "../assets/imgfiles";
import { DefaultBtn } from "../components/DefaultBtn";
const Detailpage = (props) => {
  const { open, close, selectedItemInfo } = props;
  const item = {
    name: selectedItemInfo.name,
    imgdata: selectedItemInfo.imgdata,
    imgurl: selectedItemInfo.imgurl,
    price: selectedItemInfo.price,
    brand: selectedItemInfo.brand,
  };
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
              <ImgBox className="item" imgurl={item.imgurl}></ImgBox>
              <InfoBox className="item">
                <InfoDiv className="info-item info-brand">{item.brand}</InfoDiv>
                <InfoDiv className="info-item info-name">{item.name}</InfoDiv>
                <InfoDiv className="info-item info-price">
                  {item.price} 원
                </InfoDiv>
                <InfoDiv className="info-item info-icon">
                  <div className="fa-icon">
                    <FontAwesomeIcon
                      icon={icon({ name: "heart", style: "regular" })}
                    />
                  </div>
                  <div className="fa-icon">
                    <FontAwesomeIcon
                      icon={icon({ name: "cart-plus", style: "solid" })}
                    />
                  </div>

                  <div>
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
  .item {
    flex: 1;
  }
`;
const ImgBox = styled.div`
  background-image: url(${(props) => (props.imgurl ? props.imgurl : "none")});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 18rem;
  height: 17.5rem;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  .info-item:nth-child(1) {
    flex: 1;
  }
  .info-item:nth-child(2) {
    flex: 1;
  }
  .info-item:nth-child(3) {
    flex: 1;
  }
  .info-item:nth-child(4) {
    flex: 3;
  }
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .info-name {
    color: black;
    align-items: center;
  }
  .info-price {
    align-items: center;
  }

  .info-icon {
    align-items: flex-start;
  }
  .fa-icon {
    margin: 0.6rem 0.3rem 0.3rem 0rem;
  }
`;
const DetailBtn = styled(DefaultBtn)`
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  font-size: 0.8rem;
`;
export default Detailpage;
