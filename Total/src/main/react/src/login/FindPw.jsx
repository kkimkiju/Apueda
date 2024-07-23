import {
  Container,
  Box,
  Contents,
  InputContainer,
  ShortInputContainer,
  EmailBox,
  ShortInput,
  CheckBtn,
  SubmitBtn,
} from "./style/SignFormStyle";
import logo from "../image/apueda-logo-black.png";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import React, { useState } from "react";
import PasswordModal from "./FindPasswordModal";

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

const FindPw = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [inputCode, setInputCode] = useState(null);
  const [sentCode, setSentCode] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const onChangeEmailCode = (e) => {
    const currCode = Number(e.target.value);
    if (isNaN(currCode)) {
      setInputCode("");
    } else {
      setInputCode(currCode);
    }
  };

  const authorizeMail = async () => {
    try {
      const rsp = await AxiosApi.mail(email);
      setEmailError("");
      if (rsp.data !== null) {
        setSentCode(rsp.data);
      }
    } catch (error) {
      console.error("이메일 요청 오류:", error);
    }
  };

  const checkCode = () => {
    if (inputCode === null) {
      console.log("코드를 입력해 주세요");
      return;
    }
    if (inputCode === sentCode) {
      setCodeValid(true);
      console.log("인증되었습니다");
    } else {
      setCodeValid(false);
      console.log("다시 입력해 주세요");
    }
  };

  const onChangeEmail = (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setEmailValid(false);
    } else {
      setEmailError("올바른 이메일 형식입니다.");
      setEmailValid(true);
    }
  };

  const openModal = () => {
    const allValid = emailValid && codeValid;
    if (allValid) {
      setModalOpen(true);
    } else {
      console.log("이메일 인증을 완료해 주세요.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePasswordSubmit = async (password) => {
    try {
      await AxiosApi.findPw({ email, password });
      closeModal();
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
    }
  };

  return (
    <Container>
      <Box>
        <Contents>
          <Logo />
          <h2>비밀번호 찾기</h2>
          <InputContainer>
            <EmailBox>
              <ShortInputContainer>
                <ShortInput
                  placeholder="이메일"
                  value={email}
                  onChange={onChangeEmail}
                />
                <CheckBtn onClick={authorizeMail} disabled={!emailValid}>
                  인증
                </CheckBtn>
              </ShortInputContainer>
              <span id="hint">
                {email.length > 0 && (
                  <p className={emailValid ? "success" : "error"}>
                    {emailError}
                  </p>
                )}
              </span>
            </EmailBox>
            <EmailBox>
              <ShortInputContainer>
                <ShortInput
                  placeholder="인증번호"
                  value={inputCode}
                  onChange={onChangeEmailCode}
                />
                <CheckBtn onClick={checkCode} disabled={codeValid}>
                  확인
                </CheckBtn>
              </ShortInputContainer>
            </EmailBox>
          </InputContainer>
          <SubmitBtn onClick={openModal}>찾기</SubmitBtn>
        </Contents>
      </Box>
      {isModalOpen && (
        <PasswordModal onClose={closeModal} onSubmit={handlePasswordSubmit} />
      )}
    </Container>
  );
};

export default FindPw;
