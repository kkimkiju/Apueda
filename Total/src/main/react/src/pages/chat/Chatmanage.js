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
  const navigate = useNavigate();

  // 로그인 안 할시에 로그인 창으로 이동
  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, []);

  useEffect(() => {
    const fetchProjectRooms = async () => {
      try {
        const memberId = localStorage.getItem("email");
        const response = await AxiosApi.getJoinedRooms(memberId);
        console.log(response.data);
        setMyRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchProjectRooms();
  }, []);
  useEffect(() => {
    const fetchMyOpenChatRooms = async () => {
      try {
        const memberId = localStorage.getItem("email");
        const response = await AxiosApi.getJoinedOpenChatRooms(memberId);
        console.log(response.data);
        setMyOpenChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms", error);
      }
    };

    fetchMyOpenChatRooms();
  }, []);
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
  }, []);

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
      console.log(`Joining room with ID: ${roomId}`);
      navigate(`/chat/${roomId}`, { state: { roomName, roomType: "오픈" } });
    } catch (error) {
      console.error("Error joining room", error);
    }
  };
  // 프로젝트 채팅방 삭제
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
  // 오픈채팅방 삭제
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

  return (
    <Body>
      <Container>
        <Box>
          <ModalBox isVisible={isModalVisible}>
            <CreateRoom />
            <button onClick={toggleModal}>닫기</button>
          </ModalBox>
          <Button onClick={toggleModal}>오픈채팅방 만들기</Button>
        </Box>
        <Box>
          <Item>
            <MyProjectChatBox>
              <h2>참여중인 프로젝트 채팅방 목록</h2>
              <ul>
                {myRooms.map((room) => (
                  <List key={room.roomId}>
                    <li>
                      <a
                        href="#"
                        onClick={() =>
                          handleJoinRoom(room.roomId, room.roomName)
                        }
                      >
                        {room.roomName}
                      </a>
                      <button onClick={() => handleDeleteRoom(room.roomId)}>
                        삭제
                      </button>
                    </li>
                  </List>
                ))}
              </ul>
            </MyProjectChatBox>
            <MyOpenChatBox>
              <h2>참여중인 오픈 채팅방 목록</h2>

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
                      <button
                        onClick={() => handleDeleteOpenChatRoom(room.roomId)}
                      >
                        삭제
                      </button>
                    </li>
                  </List>
                ))}

            </MyOpenChatBox>
          </Item>
          <Item>
            <OpenChatList>
              <h2>오픈 채팅방</h2>

                {chatRooms.map((room) => (
                  <List key={room.roomId}>
                    <li>
                      <a
                        href="#"
                        onClick={() =>
                          handleJoinRoom(room.roomId, room.roomName)
                        }
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

const ModalBox = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: auto;
  height: auto;
  margin: 0 15vw;
  background-color: red;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1920px;
  background-color: orange;
  margin-top: 15vh;
  @media (max-width: 500px) {
    width: 100dvw;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const Item = styled.div`
  flex-direction: row;
`;

const MyProjectChatBox = styled.div`
  margin: 5vh 5vw;
`;
const MyOpenChatBox = styled.div`
  margin: 5vh 5vw;
`;
const OpenChatList = styled.div`
  margin: 5vh 5vw;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1.5vw;

  ul {
    margin-top: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 자식 요소를 왼쪽 정렬 */

  }
  li {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: .5vh 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
    &>a{margin-right:4vw}
  }
`;
const Button = styled.button`
margin-left: 85%;
`

