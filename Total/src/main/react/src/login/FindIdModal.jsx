import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: rgba(255, 83, 53);
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background: rgba(255, 83, 53);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const FindIdModal = ({ email, onClose }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
    navigate("/apueda/login"); // "/apueda/login" 경로로 이동
  };
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>아이디 </h2>
        <p>이메일: {email}</p>
        <CloseButton onClick={handleClose}>닫기</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FindIdModal;
