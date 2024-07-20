import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../api/AxiosApi";
import exit from "../image/exit.png";
import WriteMessage from "./WriteMessage";
import Friend from "./Friend";

const ContainerBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 40vw;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ff5353;
  border: 2px solid black;
  border-radius: 100px;
  z-index: 1000;

  @media (max-width: 900px) {
    height: 700px;
  }

  @media (max-width: 500px) {
    width: 80vw;
    height: 600px;
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 기존 justify-content: center; 에서 수정 */
  flex-direction: column;
`;

// const TitelBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 20vw;
//   height: 4vw;
//   color: white;
//   border-radius: 30px;
//   background-color: #ff5353;
//   font-size: 20px;

//   @media (max-width: 700px) {
//     font-size: 15px;
//   }

//   @media (max-width: 500px) {
//     font-size: 10px;
//     width: 50vw;
//     height: 6vh;
//     top: 20px;
//   }
// `;

const PageBtn = styled.div`
  button {
    background-color: white;
    border: 1px solid black;
    margin-left: 5px;
    margin-right: 5px;
  }
`;

const Delbtn = styled.button`
  color: white;
  background-color: #ff5353;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

const MessageContainer = styled.div`
  flex: 1; /* 변경: 남은 공간을 차지하도록 설정 */
  width: 90%;
  overflow-y: auto; /* 스크롤을 추가하여 내용이 넘치지 않도록 함 */
`;

const MsgItem = styled.div`
  border-radius: 10px;
  background-color: white;
  margin-bottom: 20px; /* Adjust as needed */

  h1 {
    padding-top: 1px;
    padding-left: 5px;
    font-size: 18px;
  }
  h5 {
    text-align: right;
    padding: 2px;
  }
  @media (max-width: 1200px) {
    h1 {
      font-size: 15px;
    }
  }
`;

const Profile = styled.div`
  img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    border: 2px solid black;
  }
`;

const Message = ({ closeModal, friendEmail, friendProfile }) => {
  const [messageList, setMessageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지에 표시할 아이템 수
  const [selectedFriendEmail, setSelectedFriendEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 메세지 보내기 모달

  const openWriteModal = (friendemail) => {
    setSelectedFriendEmail(friendemail); // 클릭한 친구의 이메일을 상태에 설정
    setIsModalOpen(true); // 모달 창 열기
    document.body.style.overflow = "hidden"; //모달창 열렸을 때 스크롤 금지
//    console.log(friendemail);
  };

  const closeWriteModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const rsp = await AxiosApi.messageList(friendEmail);
        //읽음 표시 하려고 아이디 추출
//        console.log(rsp.data);
        setMessageList(rsp.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [friendEmail]); // friendEmail이 변경될 때마다 호출

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(messageList.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 항목 위치 계산
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 번째 항목 위치 계산
  const currentItems = messageList.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지의 항목들을 잘라냄

  const MessageDelete = async (postMsgId) => {
    const confirm = window.confirm("메세지를 삭제하시겠습니까?");

    if (confirm) {
      try {
        // API를 호출하여 게시글 삭제
        await AxiosApi.delMsg(postMsgId);
        // 삭제 성공 시, 상태 업데이트 등 추가 로직 처리
//        console.log("삭제 성공");
        window.alert("삭제 완료");
        setMessageList(
          messageList.filter((msg) => msg.postMsgId !== postMsgId)
        );
      } catch (error) {
        console.error("삭제 오류", error);
      }
    }
  };

  // const markMessageAsRead = async (postMsgId) => {
  //   try {
  //     // 클라이언트에서 readStatus를 true로 설정한 후 서버에 업데이트 요청 보내기
  //     await AxiosApi.updateReadStatus(postMsgId, true);
  //     // 업데이트 성공 시 UI 업데이트 등 추가 로직 처리
  //     console.log("메시지 읽음 상태 업데이트 성공");
  //   } catch (error) {
  //     console.error("메시지 읽음 상태 업데이트 오류:", error);
  //   }
  // };

  return (
    <>
      <ContainerBack>
        <Container>
          <Profile>
            <img src={friendProfile[friendEmail]} alt="Profi" />
          </Profile>
          <MessageContainer>
            {currentItems.map((postMsg, index) => (
              <MsgItem key={index}>
                <h1>{postMsg.content}</h1>

                <h5>
                  {postMsg.receiveTime}{" "}
                  <Delbtn
                    onClick={() => {
                      MessageDelete(postMsg.postMsgId);
                    }}
                  >
                    삭제
                  </Delbtn>
                </h5>
              </MsgItem>
            ))}
          </MessageContainer>

          <PageBtn>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              이전 페이지
            </button>

            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(messageList.length / itemsPerPage)
              }
            >
              다음 페이지
            </button>
          </PageBtn>
          <ButtonWrapper>
            <WriteButton
              onClick={() => {
                openWriteModal(friendEmail);
              }}
            >
              메세지 보내기
            </WriteButton>
            <Exit onClick={() => closeModal()} src={exit} />
          </ButtonWrapper>
        </Container>
      </ContainerBack>
      {isModalOpen && (
        <WriteMessage
          closeModal={closeWriteModal}
          friendEmail={selectedFriendEmail}
        />
      )}
    </>
  );
};

export default Message;
