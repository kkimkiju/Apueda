import React, { useState, useEffect } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import ChatRoom from './ChatRoom';

const ChatMain = () => {
  const [userEmail, setUserEmail] = useState('');
  const [roomId, setRoomId] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem('email', email);
  };

  if (!userEmail) {
    return (
      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => handleLogin(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div>
    <h1>Welcome, {userEmail}</h1>
    <CreateRoom userEmail={userEmail} />
    <JoinRoom />
  </div>
  );
};

export default ChatMain;
