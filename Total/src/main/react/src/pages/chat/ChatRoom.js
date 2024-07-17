// ChatRoom.js
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AxiosApi from '../../api/AxiosApi';
import { connectWebSocket, sendMessage } from '../../api/StompClient'; // 수정된 부분
import { FaPaperPlane, FaAngleLeft } from 'react-icons/fa';
import defaultImage from '../../image/person-icon2.png';
const ChatRoom = () => {
  const { roomId } = useParams(); // roomId 정보를 가져옴
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [render, setRender] =useState(0); //렌더링을 위한 상태 추가
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('Fetching chat messages for room:', roomId);
        const response = await AxiosApi.getChatMessages(roomId); // API 호출 함수 이름 확인 필요
        const fetchedMessages = response.data.map((msg) => ({
          ...msg,
          localDateTime: new Date(msg.localDateTime),
        }));
        setMessages(fetchedMessages);
        console.log('Messages fetched:', fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };
    fetchMessages();

    console.log('Connecting to WebSocket for room:', roomId);
    connectWebSocket(
      roomId,
      (newMessage) => {
        console.log('New message received:', newMessage);
        newMessage.localDateTime = new Date(newMessage.localDateTime);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      },
      (client) => {
        stompClientRef.current = client;
        setIsConnected(true);
        console.log('WebSocket connected : ' , client);
      },
      (error) => console.error('STOMP error', error)
    );

    return () => {
      if (stompClientRef.current) {
        console.log('Deactivating WebSocket connection');
        stompClientRef.current.deactivate();
      }
    };
  }, [roomId, render]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => { // 메세지 전송할때 마다 렌더링 되도록 상태 관리추가
    e.preventDefault();
    if (isConnected && message.trim()) {
      const accessToken = localStorage.getItem('accessToken');
      const profileImgPath = localStorage.getItem('imgUrl');
      sendMessage({
        senderId: localStorage.getItem('email'),
        content: message,
        roomId: roomId,
        type: 'TALK',
        localDateTime: new Date().toISOString(),
        profileImgPath: profileImgPath
      }, accessToken);
      setMessage(''); // 메세지 전송후 input창 초기화
      setRender(render+1);
    } else {
      console.log('Cannot send message, STOMP client is not connected or message is empty');
    }
  };

  return (
    <Body>
      <Container>
        <Head>
        <div>{location.state?.roomType === "프로젝트" ? "프로젝트 채팅방" : "오픈 채팅방"}</div>
        </Head>
        <Title>
          <BackButton onClick={() => navigate(-1)}>
            <p>
              <FaAngleLeft />
              나가기
            </p>
          </BackButton>
          <div>{location.state?.roomName || '채팅방 이름'}</div>
        </Title>
        <ChatBox>
          {messages.map((msg, index) => (
            <MessageItem key={index} isSender={msg.senderId === localStorage.getItem('email')}>
              <Message isSender={msg.senderId === localStorage.getItem('email')}>
              <MessageBox isSender={msg.senderId === localStorage.getItem('email')}>
                <MessageContent isSender={msg.senderId === localStorage.getItem('email')}>
                  <p>{msg.content}</p>
                </MessageContent>
                  <NicknameItem isSender={msg.senderId === localStorage.getItem('email')}>{msg.senderNickname}</NicknameItem>
              </MessageBox>
                <ProfileImage src={msg.profileImgPath || defaultImage} alt="Profile" />
              </Message>
              <TimeInfo>{new Date(msg.localDateTime).toLocaleString()}</TimeInfo>
            </MessageItem> 
          ))}
          <div ref={messagesEndRef} />
        </ChatBox>
        <Form onSubmit={handleSendMessage}>
          <TypingBox>
            <Input
              type="text"
              placeholder="메시지를 입력하세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </TypingBox>
          <SendButton type="submit">
            <FaPaperPlane />
          </SendButton>
        </Form>
      </Container>
    </Body>
  );
};

export default ChatRoom;

const Body = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
`;
const Container = styled.div`
  overflow: auto;
  width: 45vw;
  height: auto;
  min-height: 700px;
  border: 0.5vi solid rgb(255, 83, 83);
  border-radius: 3vi;
  margin-top: 2vh;
  @media (max-width:500px){
    width: 100svw;
    height: 85svh;
    border: 1vi solid rgb(255, 83, 83);
  }
`;

const Head = styled.div`
  width: 100%;
  height: 5vh;
  background-color: rgb(255, 83, 83);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Title = styled.div`
  width: 100%;
  height: 5vh;
  border-bottom: 0.5vi solid rgb(255, 83, 83);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
`;
const BackButton = styled.button`
  border: none;
  background: none;
  > p {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
  }
  transform: scale(1);
    transition: transform 5s ease;
    > :hover {
      transform: scale(1.2);
      transition: 0.5s;
    }
`;
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: 600px;
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const MessageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};
  margin-bottom: 1rem;
  padding: 0.5rem;
`;
const Message = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 70%;
  flex-direction: ${(props) => (props.isSender ? 'row' : 'row-reverse')};
`;
const TimeInfo = styled.div`
  white-space: nowrap;
  margin-top: 0.01rem; // 상하 간격 줄이기
  @media (max-width:500px){
    font-size: 3vw;
  }
`;
const MessageBox = styled.div`
display: flex;
flex-direction: column;
align-items: ${(props) => (props.isSender ? 'flex-end' : 'flex-start')};
`
const NicknameItem = styled.p`
 margin: ${(props) => (props.isSender ? '0.5rem 0 0 1rem' : '0.5rem 1vw 0 0')}; // 상하 간격 줄이기
`
const ProfileImage = styled.img`
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  margin: 2vh 1vw 0 1vw;
  @media (max-width:500px){
    width: 10vw;
    height: 10vw;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 20vw;
  color: ${(props) => (props.isSender ? 'white' : 'black')};
  background: ${(props) =>
    props.isSender
      ? 'linear-gradient(to right, rgba(128, 0, 255, 0.9) 0%, rgba(64, 36, 255, 0.9) 60%, rgba(0, 80, 255, 0.8) 100%)'
      : '#E2E2E2'};
  border-radius: ${(props) => (props.isSender ? '1.5vw 1.5vw 0 1.5vw' : '1.5vw 1.5vw 1.5vw 0 ')};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  padding: 0.5vw 1vh;
  @media (max-width: 500px){
    max-width:50vw;
    border-radius: ${(props) => (props.isSender ? '4vw 4vw 0 4vw' : '4vw 4vw 4vw 0 ')};
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
`;

const TypingBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 0.3vi solid rgb(255, 83, 83);
  border-radius: 4vi;
  margin-right: 1rem;
`;

const SendButton = styled.button`
  background-image: linear-gradient(
    to right,
    #9643ff 0%,
    #545bff 50%,
    #0094ff 100%
  );
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: auto;
  padding: 0.5rem 1rem;
`;
const Input = styled.input`
  border: none;
  width: 100%;
`;
