import styled from "styled-components";
import logo from "../image/apueda-logo-black.png";
import AxiosApi from "../api/AxiosApi";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Kakaologin from "./Kakaologin";
import PaymentApi from "../api/PaymentAxios";

const Container = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 450px;
`;
const Box = styled.div`
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ff5353;
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
  & input {
    border-radius: 8px;
    color: #ffffff;
    @media screen and (max-width: 1040px) {
      width: 280px;
    }
    @media screen and (max-width: 500px) {
      width: 220px;
    }
  }
  & button {
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: white;
      border: 2px solid black;
      color: black;
    }
    &:active {
      background-color: #87160e;
    }
  }
`;
const Logo = styled.div`
  width: 150px;
  height: 150px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 1040px) {
    width: 100px;
    height: 100px;
  }
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
  margin-bottom: -20px;
  color: white;
  & h2 {
    @media screen and (max-width: 1040px) {
      text-align: center;
    }
    @media screen and (max-width: 500px) {
      text-align: center;
    }
  }
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
  justify-content: flex-end;
  flex-wrap: nowrap;
  & .findBtn {
    border: 0;
    background: none;
    display: inline-flex;
    color: white;
    margin-right: 5px;
    white-space: nowrap;
    &:hover {
      background: none;
      border: none;
    }
  }
  @media screen and (max-width: 1040px) {
    justify-content: center;
  }
  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;
const SummitBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  gap: 10px;
  @media screen and (max-width: 1040px) {
    width: 280px;
  }
  @media screen and (max-width: 500px) {
    width: 220px;
  }
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
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
`;
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accToken, setAccToken] = useState("");
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { setLoginStatus, loginStatus, subscribeStatus, setSubscribeStatus } =
    context;

  useEffect(() => {
    if (loginStatus) {
      navigate("/apueda");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const rsp = await AxiosApi.login(email, password);
      if (rsp.data) {
        subScribeCheck();
      }
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
  const subScribeCheck = async () => {
    try {
      const rsp = await PaymentApi.deadline(email);
      if (rsp.data[0].status) {
        console.log(rsp.data[0].status);
        setSubscribeStatus(true);
      } else {
        setSubscribeStatus(false);
      }
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
              <button onClick={handleFindId} className="findBtn">
                아이디찾기
              </button>
              <span> / </span>
              <button onClick={handleFindPw} className="findBtn">
                비밀번호찾기
              </button>
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
