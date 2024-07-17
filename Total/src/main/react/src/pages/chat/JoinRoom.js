//JoinRoom.js
import React, { useState } from 'react';
import axios from 'axios';
import ChatRoom from './ChatRoom';

const JoinRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoinRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:8118/chat/room/${roomName}`);
      setRoomId(response.data.roomId);
      setJoined(true);
    } catch (error) {
      console.error('Error joining room', error);
    }
  };

  return (
    <div>
      <h2>Join Room</h2>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
      {joined && <ChatRoom roomId={roomId} />}
    </div>
  );
};

export default JoinRoom;
