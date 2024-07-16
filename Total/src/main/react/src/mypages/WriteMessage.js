import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import exit from "../image/exit.png";

const ContainerBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 35vw;
  min-height: 45vw;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ff5353;
  border: 2px solid black;
  border-radius: 100px;
  z-index: 1;

  @media (max-width: 900px) {
    width: 55vw;
  }

  @media (max-width: 500px) {
    width: 80vw;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 4vw;
  color: white;
  border-radius: 30px;
  background-color: #ff5353;
  font-size: 30px;
  font-weight: 700;

  @media (max-width: 700px) {
    font-size: 15px;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    width: 50vw;
    height: 6vh;
    top: 20px;
  }
`;
const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Content = styled.textarea`
  width: 80%;
  height: 25vw;
  padding: 10px;
  margin: 20px 0;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  resize: none; /* 사용자가 크기를 조정하지 못하게 함 */
`;
const WriteButton = styled.button`
  margin-top: 20px;
  height: 50px;
  width: 200px;
  border: 2px solid black;
  border-radius: 30px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;

  &:hover {
    border: 4px solid gray;
    font-size: 22px;
  }
`;

const WriteMessage = ({ closeModal, friendEmail }) => {
  const [content, setContent] = useState("");
  const receiveEmail = friendEmail;
  const calculateByteLength = (str) => {
    let byteLength = 0;
    for (let i = 0; i < str.length; i++) {
      byteLength += str.charCodeAt(i) > 127 ? 3 : 1;
    }
    return byteLength;
  };

  const handleContentChange = (event) => {
    const value = event.target.value;
    if (calculateByteLength(value) <= 180) {
      setContent(value);
    } else {
      // 만약 100바이트를 초과하면 입력 필드를 비활성화
      event.preventDefault();
    }
  };

  const handlePost = async () => {
    try {
      if (content.length < 2) {
        alert("내용은 최소 2글자 이상이어야 합니다.");
        return;
      }
      await AxiosApi.writeMessage(receiveEmail, content);
      alert("전송이 완료 되었습니다!");
      closeModal();
    } catch (error) {
      alert("글 등록에 실패", error);
    }
  };
  return (
    <ContainerBack>
      <Container>
        <Title>메세지 보내기</Title>
        <Content
          type="text"
          onChange={handleContentChange}
          value={content}
          placeholder="메세지를 입력하세요(공백 포함 60글자 이하)"
        />
        <WriteButton onClick={handlePost}>보내기</WriteButton>
        <Exit onClick={() => closeModal()} src={exit} />
      </Container>
    </ContainerBack>
  );
};

export default WriteMessage;
