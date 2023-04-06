import { useRecoilValue } from "recoil";
import userIdState from "../atom/userIdState";
import { userAuth } from "../api/userInfo";
import styled from "styled-components";
const Auth = () => {
  const testId = useRecoilValue(userIdState);
  const testAuth = async () => {
    // const refreshToken = await getCookie("refresh_cookie");
    // const data = { id: "test4", refreshToken: refreshToken };
    const authResult = await userAuth({ testId: testId });
    if (authResult.status === 201) {
      return console.log("access token saved");
    } else if (authResult.status === 200) {
      return console.log("access token is valid");
    }
    // <- status 200, 201 session storage에 auth user 저장
    // -> 그 외 /login path로 navigate
    return console.log("Invalid user");
  };
  return (
    <>
      <div>Auth page test</div>
      <InputBtn onClick={testAuth}>Cookie Test</InputBtn>
    </>
  );
};
const InputBtn = styled.button`
  border-radius: 3px;
  border: 0px;
  padding: 2px 9px;
  transition: all 0.4s ease 0s;
  font-size: 0.6rem;
  color: white;
  background-color: black;
  width: 50%;
  cursor: pointer;
  &:hover {
    filter: brightness(90%);
  }
`;
export default Auth;
