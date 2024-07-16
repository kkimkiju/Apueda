import styled from "styled-components";
import logo from "../image/apueda-logo-black.png";
import AxiosApi from "../api/AxiosApi";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Kakaologin from "./Kakaologin";

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & input {
    border-radius: 8px;
    color: #ffffff;
  }
  & button {
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      /* background-color: #c72519; */
      background-color: white; /* hover 시 배경색 변경 */
      border: 2px solid black;
      color: black;
    }
    &:active {
      background-color: #87160e; /* 클릭 시 배경색 변경 */
    }
  }
`;
const Box = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ff5353;
  /* background: rgba(255, 83, 53, 0.8); */
  background-color: #ff5353;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
`;
const Contents = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;
const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 10px;
`;
const LoginTxt = styled.div`
  width: 40%;
  height: auto;
  text-align: left;
  margin-bottom: -20px;
  color: white;
`;

const InputBox = styled.input`
  display: flex;
  flex-direction: column;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  width: 40%;
  height: 40px;
  padding-left: 10px;
  box-sizing: border-box;
`;
const ButtonBox = styled.div`
  display: flex;
  width: 40%;
  justify-content: right;
`;
const FindBtn = styled.button`
  border: 0;
  background: none;
  display: flex;
  color: white;
`;
const SummitBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
`;
const LoginBtn = styled.button`
  border: 0;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
`;
const SignUpBtn = styled.button`
  border: 0;
  height: 40px;
  /* background-color: #ff5353; */
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  /* border: 2px solid black; */
`;
const ThirdLoginBtn = styled.button`
  border: 0;
  height: 40px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  /* background-color: #ffffde; */
`;
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accToken, setAccToken] = useState("");
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus, loginStatus } = context;

  useEffect(() => {
    if (loginStatus) {
      navigate("/apueda");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const rsp = await AxiosApi.login(email, password);
      localStorage.setItem("email", email); // 삭제 예정
      setAccToken(rsp.data.accessToken);
      localStorage.setItem("accessToken", rsp.data.accessToken);
      localStorage.setItem("refreshToken", rsp.data.refreshToken);
      console.log(accToken);
      navigate("/apueda");
      setLoginStatus(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSignup = () => {
    navigate("/apueda/signup");
  };
  const handleFindId = () => {
    navigate("/apueda/findid");
  };
  const handleFindPw = () => {
    navigate("/apueda/findpw");
  };

  return (
    <Container>
      <Box>
        <Contents>
          <Logo />
          <InputContainer>
            <LoginTxt>
              <h2>로그인</h2>
            </LoginTxt>
            <InputBox
              placeholder="이메일(example@naver.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonBox>
              <FindBtn onClick={handleFindId}>아이디찾기</FindBtn>
              <span> / </span>
              <FindBtn onClick={handleFindPw}>비밀번호찾기</FindBtn>
            </ButtonBox>
          </InputContainer>
          <SummitBtnBox>
            <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            <SignUpBtn onClick={handleSignup}>회원가입</SignUpBtn>
            <Kakaologin />
          </SummitBtnBox>
        </Contents>
      </Box>
    </Container>
  );
};
export default LoginPage;
