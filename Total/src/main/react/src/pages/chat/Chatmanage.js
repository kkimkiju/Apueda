import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { UserContext } from "../../context/UserStore";
import CreateRoom from "./CreateRoom";
import styled from "styled-components";

const ChatManage = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [myOpenChatRooms, setMyOpenChatRooms] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [render, setRender] = useState(0); // 재렌더링을 위한 상태 추가
  const navigate = useNavigate();

  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, [loginStatus, navigate]);
  useEffect(() => {
    const fetchMyOpenChatRooms = async () => {
      try {
        const memberId = localStorage.getItem("email");
        const response = await AxiosApi.getJoinedOpenChatRooms(memberId);
        setMyOpenChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchMyOpenChatRooms();
  }, [render]);
  useEffect(() => {
    const fetchOpenChatRooms = async () => {
      try {
        const response = await AxiosApi.getOpenChatList(false);
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchOpenChatRooms();
  }, [render]);

  const handleJoinRoom = async (roomId, roomName) => {
    try {
      await AxiosApi.joinRoom(roomId);
      console.log(`Joining room with ID: ${roomId}`);
      navigate(`/chat/${roomId}`, {
        state: { roomName, roomType: "프로젝트" },
      });
    } catch (error) {
      console.error("Error joining room", error);
    }
  };
  const handleJoinOpenChatRoom = async (roomId, roomName) => {
    try {
      await AxiosApi.getJoinedOpenChatRooms(roomId);
      navigate(`/chat/${roomId}`, { state: { roomName, roomType: "오픈" } });
    } catch (error) {
      console.error("Error joining room", error);
    }
  };
  const handleDeleteRoom = async (roomId) => {
    try {
      await AxiosApi.exitRoom(roomId);
      setMyRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };
  const handleDeleteOpenChatRoom = async (roomId) => {
    try {
      await AxiosApi.exitRoom(roomId);
      setMyOpenChatRooms((prevRooms) =>
        prevRooms.filter((room) => room.roomId !== roomId)
      );
    } catch (error) {
      console.error("Error deleting room", error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleClose = () => {
    toggleModal();
    setRender(render + 1); // Render 상태를 업데이트하여 재렌더링 유도
  };

  return (
    <Body>
      <Container>
        <ButtonBox>
          <ModalBox isVisible={isModalVisible}>
            <CreateRoom />
            <CloseButtonContainer>
              <CloseButton onClick={handleClose}>닫기</CloseButton>
            </CloseButtonContainer>
            
          </ModalBox>
          <OpenChatButton onClick={toggleModal}>채팅방 만들기</OpenChatButton>
        </ButtonBox>
        <Box>
          <Item>
            <MyOpenChatBox>
              <p>🔥 참여중인 채팅방 목록</p>
              {myOpenChatRooms.map((room) => (
                <List key={room.roomId}>
                  <li>
                    <a
                      href="#"
                      onClick={() =>
                        handleJoinOpenChatRoom(room.roomId, room.roomName)
                      }
                    >
                      {room.roomName}
                    </a>
                    <DeleteButton onClick={() => handleDeleteOpenChatRoom(room.roomId)}>
                      삭제
                    </DeleteButton>
                  </li>
                </List>
              ))}
            </MyOpenChatBox>
          </Item>
          <Item>
            <OpenChatList>
              <p>💬 오픈 채팅방</p>
              {chatRooms.map((room) => (
                <List key={room.roomId}>
                  <li>
                    <a
                      href="#"
                      onClick={() => handleJoinRoom(room.roomId, room.roomName)}
                    >
                      {room.roomName}
                    </a>
                  </li>
                </List>
              ))}
            </OpenChatList>
          </Item>
        </Box>
      </Container>
    </Body>
  );
};

export default ChatManage;



const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  margin: 0 15vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
  max-width: 1920px;
  height: auto;
  background-color: #ffffff;
  border: 0.5vw solid #ff5353;
  border-radius: 5vw;
  margin-top: 5vh;
  @media (max-width: 500px) {
    width: 75dvw;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 4vh 3vw 0 0;
  @media (max-width: 500px) {
    margin: 2vh 3vw 0 0;
  }
`;
const ModalBox = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  width: 40vw;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 1vw;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  @media (max-width:500px){
    flex-direction: row;
    justify-content: center;
    width: 60vw;
    border-radius: 3vw;
  }
  
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2vh;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 1vh;
  }
`;

const Item = styled.div` // 테두리 안쪽 간격 조정
  flex-direction: row;
  @media (max-width: 500px) {
    width: 73vw;

    }
  & p { // 제목 스타일 관리
    font-size: 1.5vw;
    border-bottom: 0.15vw solid rgba(0,0,0,0.1);
    @media (max-width: 500px) {
    font-size: 5vw;
    }
  }
`;

const MyOpenChatBox = styled.div`
  white-space: nowrap;
  margin: 1vh 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30vw;
  height: auto;
  @media (max-width: 500px) {
    width: 73vw;
    }
`;

const OpenChatList = styled.div`
  white-space: nowrap;
  margin: 1vh 1vw;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30vw;
  height: auto;
  @media (max-width: 500px) {
    width: 73vw;
    }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 1.2vw;

  ul {
    margin-top: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  li {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: 1vh 0;
    padding: 0;
    width: 95%; /* 너비를 추가 */
    overflow: hidden; /* 내용이 넘칠 경우 숨기기 */
    white-space: nowrap; /* 한 줄로 표시 */
    text-overflow: ellipsis; /* 넘친 내용은 생략 부호로 표시 */
    & > a {
      text-decoration: none;
      color: black;
      margin-right: 4vw;
      flex-grow: 1; /* 링크 요소가 남은 공간을 차지하도록 설정 */
      overflow: hidden; /* 내용이 넘칠 경우 숨기기 */
      white-space: nowrap; /* 한 줄로 표시 */
      text-overflow: ellipsis; /* 넘친 내용은 생략 부호로 표시 */
      &:hover {
        color: gray;
      }
      @media (max-width: 500px) {
    font-size: 3vw;
    }
    }
  }
`;

const OpenChatButton = styled.button`
  width: 12vw;
  height: 3vw;
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 1vw;
  font-size: 1.5vw;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff7878;
  }
  @media (max-width: 500px) {
    height: 2vh;
  }
`;
const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0vh;
`;
const CloseButton = styled.button`
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 1vw;
  padding: 10px 20px;
  font-size: 1vw;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff7878;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
    border-radius: 3vw;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff5353;
  color: white;
  border: none;
  border-radius: 1vw;
  padding: 0.2vw 1vw;
  font-size: 1vw;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ff7878;
  }
  @media (max-width: 500px) {
    font-size: 2vw;
    padding: 0.5vw 4vw;
    border-radius: 1.5vw;
  }
`;
