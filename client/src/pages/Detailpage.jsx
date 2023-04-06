import styled from "styled-components";
const Detailpage = (props) => {
  const { open, close, selectedItemInfo } = props;
  const item = {
    name: selectedItemInfo.name,
    imgdata: selectedItemInfo.imgdata,
    imgurl: selectedItemInfo.imgurl,
    price: selectedItemInfo.price,
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
              <ImgBox imgurl={item.imgurl}></ImgBox>
              <InfoBox>
                <InfoDiv className="info-name">{item.name}</InfoDiv>
                <InfoDiv className="info-price">{item.price}</InfoDiv>
                <InfoDiv>
                  <a
                    href="https://www.flaticon.com/free-icons/smart-cart"
                    title="smart cart icons"
                  >
                    {" "}
                  </a>
                  <a
                    href="https://www.flaticon.com/free-icons/heart"
                    title="heart icons"
                  >
                    {" "}
                  </a>
                  <div>구매하기</div>
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
`;
const ImgBox = styled.div`
  background-image: url(${(props) => (props.imgurl ? props.imgurl : "none")});
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  .info-name {
    color: black;
    font-weight: 500;
    font-size: 1rem;
  }
  .info-price {
    font-weight: 300;
    font-size: 0.8rem;
  }
`;
export default Detailpage;
