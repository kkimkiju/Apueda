// CreateRoom.js
import React, { useState } from 'react';
import axios from 'axios';
import AxiosApi from '../../api/AxiosApi';
import styled from 'styled-components';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [created, setCreated] = useState(false);
  const email = localStorage.getItem("accessToken");

  const handleCreateRoom = async () => {
    try {
      const response = await AxiosApi.createOpenRoom(roomName, email);
      setRoomId(response.data.roomId);
      setRoomName(response.data.roomName);
      setCreated(true);
    } catch (error) {
      console.error('Error creating room', error);
    }
  };

  return (
    <Container>
      <h2>오픈채팅방 제목 입력창</h2>
      <input
        type="text"
        placeholder="방이름을 입력하세요."
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>생성</button>
      {created && (
        <div>
          <p>오픈채팅방이 생성되었습니다.</p>
          {/* <p>Room ID: {roomId}</p> */}
          <p>방제목: {roomName}</p>
        </div>
      )}
    </Container>
  );
};

export default CreateRoom;

const Container = styled.div`
width: 50vw;
display: flex;
flex-direction: column;
align-items: center;
background-color: aqua;
`
