import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import letter from "../image/letter.png";
import newLetter from "../image/NewLetter.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import Message from "./Message";

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px; //푸터랑 멀게
`;

const ExitWrapper = styled.div``;

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

const Letter = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;
const NewLetter = styled.img`
  width: 40px;
  height: 35px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;

  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Button = styled.button`
  background-color: ${(props) =>
    props.primary === "true" ? "#ff5353" : "gray"};
  color: white;
  border: 1px solid black;
  padding: 6px;
  font-size: 20px;
  cursor: pointer;
  width: 25vw;
  &:hover {
    background-color: black;
  }
  @media (max-width: 700px) {
    width: 40vw;
  }
`;

const Friendcontainer = styled.div`
  width: 90vw;
  padding: 40px;
  padding-bottom: 10px;
  margin-bottom: 30px;
  border: 4px solid #ff5353;
  border-radius: 30px;

  @media (max-width: 1200px) {
    min-width: 700px;
    padding-top: 10px;
    white-space: nowrap;
  }
  @media (max-width: 900px) {
    min-width: 400px;
    padding-top: 10px;
    white-space: nowrap;
  }
  @media (max-width: 600px) {
    border: none;
    white-space: nowrap;
  }
`;

const Requsetcontainer = styled.div`
  min-width: 50vw;
  padding: 40px;
  padding-bottom: 10px;
  border: 3px solid #ff5353;
  border-radius: 30px;
  flex-direction: column;

  @media (max-width: 500px) {
    min-width: 80vw;
  }

  @media (max-width: 380px) {
    min-width: 20vw;
  }
`;

const ItemGrid = styled.div`
  display: grid;
  justify-items: center;

  grid-template-columns: repeat(2, minmax(2vw, 1fr));
  margin-bottom: 50px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, minmax(2vw, 1fr));
    margin-bottom: 10px;
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(2vw, 1fr));
    margin-bottom: 10px;
    gap: 10px;
  }
`;

const FriendItem = styled.div`
  min-width: 35vw;
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 5px solid #ff5353;
  border-radius: 30px;
  margin-top: 25px;

  @media (max-width: 1000px) {
    min-width: 50vw;
    height: 10vw;
  }

  @media (max-width: 800px) {
    width: 60vw;
    height: 15vw;
  }
  @media (max-width: 600px) {
    width: 95vw;
    height: 17vw;
  }
`;

const RequestItem = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 0px;
  border-bottom: 3px solid gray;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    margin-top: 0px;
  }
`;

const ProfileImage = styled.div`
  img {
    width: 65px;
    height: 60px;
    border-radius: 100px;
  }

  @media (max-width: 500px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

//감싸지 않으면  justify-content: space-between 코드 때문에 버튼의 간격도 벌어짐
const ProfileNickNameWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 5px;
`;

const ReqBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const LetterDelBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyle = styled.button`
  min-width: 5vw;
  height: 30px;
  margin-left: 10px;
  color: white;
  background-color: #ff5353;
  border: none;
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    width: 50px;
    height: 25px;
  }
`;

const Friend = () => {
  const [showFriend, setshowFriend] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [friends, setFriends] = useState([]);
  const [friendReq, setFriendReq] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFriendEmail, setSelectedFriendEmail] = useState("");
  const [friendImageUrls, setfriendImageUrls] = useState(null);
  const [reqImageUrls, setReqImageUrls] = useState({});

  //메세지 모달창
  const openModal = (email) => {
    setSelectedFriendEmail(email); // 클릭한 친구의 이메일을 상태에 설정
    setIsModalOpen(true); // 모달 창 열기
    document.body.style.overflow = "hidden"; //모달창 열렸을 때 스크롤 금지
//    console.log(email);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  //친구리스트
  useEffect(() => {
    const fechFriend = async () => {
      try {
        const rsp = await AxiosApi.friendlist();
//        console.log(rsp.data);
//        console.log(localStorage.getItem("email"));
        setFriends(rsp.data); // 백엔드에서 받아온 친구 목록을 상태에 저장

        // 각 친구의 이미지 URL을 설정
        const urls = {};
        rsp.data.forEach((friend) => {
          if (friend.member2) {
            urls[friend.member2.email] = friend.member2.profileImgPath;
          }
        });
        setfriendImageUrls(urls);
      } catch (e) {
        console.log(e);
      }
    };

    fechFriend();
  }, []);

  const updateReadCheck = async (friendEmail) => {
    try {
      // 서버 API를 호출하여 읽은 상태를 업데이트
      await AxiosApi.updateReadCheck(friendEmail);

      // 친구 목록(friends)을 업데이트하여 읽은 상태가 변경된 것을 반영
      const updatedFriends = friends.map((friend) => {
        if (friend.member2.email === friendEmail) {
          return {
            ...friend,
            readCheck: true,
          };
        }
        return friend;
      });

      // 상태 업데이트
      setFriends(updatedFriends);

//      console.log("읽음으로 변경");
    } catch (error) {
      console.error("상태 업데이트 오류:", error);
    }
  };

  //친구요청관리
  useEffect(() => {
    const fechFriendRequest = async () => {
      try {
        const rsp = await AxiosApi.friendRequestList();
        setFriendReq(rsp.data); // 백엔드에서 받아온 친구 목록을 상태에 저장

        const urls = {};
        rsp.data.forEach((request) => {
          urls[request.member.email] = request.member.profileImgPath;
        });

        setReqImageUrls(urls); // 상태 업데이트
//        console.log(urls);
      } catch (error) {
        console.error("친구 요청 목록 가져오기 오류:", error);
      }
    };

    fechFriendRequest();
  }, []);

  //친구 삭제
  const friendDelete = async (friendEmail) => {
    const confirm = window.confirm("친구를 삭제하시겠습니까?");
    if (confirm) {
      try {
        // API를 호출하여 게시글 삭제
        await AxiosApi.friendDelete(friendEmail);
        // 삭제 성공 시, 상태 업데이트 등 추가 로직 처리

        // 삭제된 친구를 제외한 새로운 배열 생성
        const updatedFriends = friends.filter(
          (friend) => !(friend.member2 && friend.member2.email === friendEmail)
        );
        // 상태 업데이트
        setFriends(updatedFriends);
//        console.log("삭제 성공");
        window.alert("삭제 완료");
      } catch (error) {
        console.error("삭제 오류", error);
      }
    }
  };

  //요청 수락
  const requsetAccept = async (memberEmail) => {
    try {
      await AxiosApi.friendRequestAccept(memberEmail);
//      console.log("친추 성공");
      window.alert("추가 완료");
      window.location.reload();
    } catch (error) {
      console.error("오류 : ", error);
    }
  };

  //요청 거절
  const requestReject = async (memberEmail) => {
    try {
      await AxiosApi.friendRequestReject(memberEmail);
//      console.log("거절 완료");
      window.alert("거절 완료");
      window.location.reload();
    } catch (error) {
      console.error("오류 : ", error);
//      console.log(memberEmail);
    }
  };

  return (
    <>
      <Container>
        <Title>친구</Title>

        <ButtonContainer>
          <Button
            primary={showFriend ? "true" : "false"}
            onClick={() => {
              setshowFriend(true);
              setShowApp(false);
            }}
          >
            친구 목록
          </Button>

          <Button
            primary={showApp ? "true" : "false"}
            onClick={() => {
              setshowFriend(false);
              setShowApp(true);
            }}
          >
            요청
          </Button>
        </ButtonContainer>

        {showFriend && (
          <Friendcontainer>
            <ItemGrid>
              {friends.map((friend, index) => (
                <div key={index}>
                  <FriendItem>
                    {/* 친구 이름이 user/touser에 있기 때문에 두 가지로 부름*/}
                    <ProfileNickNameWrapper>
                      <ProfileImage>
                        <img
                          src={friend.member2.profileImgPath}
                          alt="이미지x"
                        />
                      </ProfileImage>
                      {friend.member2.nickname}
                    </ProfileNickNameWrapper>
                    <LetterDelBtn>
                      {/* Letter Del로 감싸지 않으면 삭제와 메세지가 space-between으로 멀어짐*/}
                      {friend.readCheck ? (
                        <Letter
                          src={letter}
                          onClick={() => {
                            openModal(friend.member2.email);
                            updateReadCheck(friend.member2.email);
                          }}
                        />
                      ) : (
                        <NewLetter
                          src={newLetter}
                          onClick={() => {
                            openModal(friend.member2.email);
                            updateReadCheck(friend.member2.email);
                          }}
                        />
                      )}
                      <ButtonStyle
                        onClick={() => friendDelete(friend.member2.email)}
                      >
                        삭제
                      </ButtonStyle>
                    </LetterDelBtn>
                  </FriendItem>
                </div>
              ))}
            </ItemGrid>
            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>
          </Friendcontainer>
        )}

        {showApp && (
          <Requsetcontainer>
            {friendReq.map((requset) => (
              <RequestItem key={requset.friendId}>
                <ProfileNickNameWrapper>
                  <ProfileImage>
                    <img src={reqImageUrls[requset.member.email]} alt="Profi" />
                  </ProfileImage>
                  {requset.member.nickname}
                </ProfileNickNameWrapper>
                <ReqBtn>
                  <ButtonStyle
                    onClick={() => requsetAccept(requset.member.email)}
                  >
                    수락
                  </ButtonStyle>
                  <ButtonStyle
                    onClick={() => requestReject(requset.member.email)}
                  >
                    거절
                  </ButtonStyle>
                </ReqBtn>
              </RequestItem>
            ))}

            <ExitWrapper>
              <Link to="/apueda/mypage">
                <Exit src={exit} />
              </Link>
            </ExitWrapper>
          </Requsetcontainer>
        )}
      </Container>

      {isModalOpen && (
        <Message
          closeModal={closeModal}
          friendEmail={selectedFriendEmail}
          friendProfile={friendImageUrls}
        />
      )}
    </>
  );
};

export default Friend;
