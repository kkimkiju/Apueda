// CreateRoom.js
import React, { useState } from "react";
import axios from "axios";
import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [created, setCreated] = useState(false);
  const email = localStorage.getItem("accessToken");

  const handleCreateRoom = async () => {
    try {
      const response = await AxiosApi.createOpenRoom(roomName, email);
      setRoomId(response.data.roomId);
      setRoomName(response.data.roomName);
      setCreated(true);
    } catch (error) {
      console.error("Error creating room", error);
    }
  };

  return (
    <Container>
      <Title>오픈채팅방 제목 입력창</Title>
      <Box>
        <StyledInput
          type="text"
          placeholder="방이름을 입력하세요."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Button onClick={handleCreateRoom}>생성</Button>
      </Box>
      <Box>
        {created && (
          <div>
            <p>오픈채팅방이 생성되었습니다.</p>
            <p>방제목: {roomName}</p>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default CreateRoom;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  margin-bottom: 1vh;
  @media (max-width:500px){
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 1.5vw;
  font-weight: bold;
  @media (max-width:500px){
    font-size:4vw;
  }
`;

const Box = styled.div`
  display: flex;
  margin: 1vh 5vw;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0 1vw;
  border: 0.2vw solid #ccc;
  border-radius: 2vw;
  font-size: 1.5vw;
  margin-right: 1vw;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #ff5353;
  }
  @media (max-width:500px){
    width: 40vw;
    font-size: 3vw;
  }
`;

const Button = styled.button`
  height: auto;
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 1vw;
  padding: 1vh 2vw; /* 변경된 패딩 */
  font-size: 1vw;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ff7878;
  }
  @media (max-width:500px){
    font-size: 3vw;
    border-radius: 2vw;
  }
`;
