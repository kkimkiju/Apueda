import { Container, Box, Contents, SubmitBtn } from "./style/SignFormStyle";
import logo from "../image/apueda-logo-black.png";
import React, { useState } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import FindIdModal from "./FindIdModal";

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
const LongInput = styled.input`
  width: 40%;
  height: 40px;
  margin-top: 26px;
  background-color: rgba(0, 0, 0, 0.6);
  @media screen and (max-width: 1260px) {
    width: 280px;
  }
  @media screen and (max-width: 500px) {
    width: 220px;
  }
`;

const FindId = () => {
  const [formattedIdentityNumber, setFormattedIdentityNumber] = useState("");
  const [name, setName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [email, setEmail] = useState("");
  const [identifyNumberValid, setIdentifyNumberValid] = useState(false); // 주민번호 숫자 다 입력했는지 확인
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeIdentityNumber = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 입력받기
    if (value.length > 7) {
      value = value.slice(0, 7); // 최대 7자리까지만 입력받기
    }

    // 하이픈 포맷팅 적용
    let formattedValue = value;
    if (value.length > 6) {
      formattedValue = value.slice(0, 6) + "-" + value.slice(6);
    }

    setIdentityNumber(value); // 숫자만 입력된 값을 설정
    setFormattedIdentityNumber(formattedValue); // 하이픈 포맷이 적용된 값을 설정

    // 유효성 검사
    setIdentifyNumberValid(value.length >= 7);
    console.log(identifyNumberValid);
  };

  const findIdHandler = async () => {
    const user = {
      name,
      identityNumber,
    };
    try {
      console.log(user);
      const rsp = await AxiosApi.findId(user);
      setEmail(rsp.data);
      console.log(rsp.data);
      setIsModalOpen(true); // 모달 열기
    } catch (e) {
      console.log(e);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Box>
        <Contents>
          <Logo />
          <h2>아이디 찾기</h2>

          <LongInput placeholder="이름" value={name} onChange={onChangeName} />
          <LongInput
            placeholder="주민번호(앞 6자리, 뒤 1자리)"
            value={formattedIdentityNumber}
            onChange={onChangeIdentityNumber}
          />

          <SubmitBtn onClick={findIdHandler}>찾기</SubmitBtn>
        </Contents>
      </Box>
      {isModalOpen && <FindIdModal email={email} onClose={closeModal} />}
    </Container>
  );
};

export default FindId;
