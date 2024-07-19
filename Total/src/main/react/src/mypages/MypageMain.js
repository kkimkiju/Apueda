import React from "react";
import styled from "styled-components";
import GlobalStyle from "../font/GlobalStyle";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Myprofile from "./Myprofile";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";

const Container = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: black;
  margin-bottom: 50px;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  justify-content: center;
  transition: all 0.2s ease-in;

  @media (max-width: 500px) {
    display: grid;

    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
`;

const Button = styled.button`
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 20px 80px;
  font-size: 20px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  text-decoration: none; //하이퍼링크 밑줄 때문에
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #ff5353;
    transition: all 0.2s ease-in;
    color: white;
    background-color: black;
  }
  @media (max-width: 500px) {
    border-radius: 20px;
    font-size: 20px;
    width: 70vw;
    height: 13vw;
  }
  @media (max-width: 500px) {
   font-size: 17px;
   }
  }
`;

const MypageMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로그인 안 할시에 로그인 창으로 이동
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; //모달창 열렸을 때 스크롤 금지
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };
  return (
    <>
      <Container>
        <Title>마이페이지</Title>
        <ButtonContainer>
          <Button as={Link} to="/apueda/mypage/memberupdate">
            회원 정보 수정
          </Button>

          <Button
            onClick={() => {
              openModal();
            }}
          >
            나의 프로필
          </Button>
          <Button as={Link} to="/apueda/mypage/mypj">
            나의 프로젝트
          </Button>
          <Button as={Link} to="/apueda/chatmanage">
            오픈 채팅방
          </Button>
          <Button as={Link} to="/apueda/mypage/mywrite">
            내가 쓴 글
          </Button>
          <Button as={Link} to="/apueda/mypage/friend">
            친구
          </Button>
        </ButtonContainer>
      </Container>

      {isModalOpen && <Myprofile closeModal={closeModal} />}
    </>
  );
};

export default MypageMain;
