// card.js
import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import TinderCard from "react-tinder-card";
import {
  FaRegCircleCheck,
  FaRegCircleXmark,
  FaArrowRotateLeft,
} from "react-icons/fa6";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../image/alien2.png";

function DatingApp() {
  const [cardList, setCardList] = useState([]);
  const [likedList, setLikedList] = useState([]); // 좋아요 누른 사람들은 현재페이지에서 나갈때 일괄 신청 되도록 리스트에 입력
  const [unlikedList, setUnlikedList] = useState([]); // 싫어요 누른 사람들은 현재페이지에서 나갈때 일괄 신청 되도록 리스트에 입력
  const myEmail = localStorage.getItem("email");
  const [currentIndex, setCurrentIndex] = useState(0); // 겹친 카드중 선택 순서
  const [lastDirection, setLastDirection] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false); // 구독 여부 상태
  const [hasUsedFreeTrial, setHasUsedFreeTrial] = useState(false); // 비구독자의 무료 사용 여부
  const [showLimitModal, setShowLimitModal] = useState(false); // 모달 상태 추가
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  //429 에러 핸들링
  const handleError = (error) => {
    if (error.response && error.response.status === 429) {
      setShowLimitModal(true); 
    }
  };
  // 모달 관리
  const handleCloseLimitModalYes = () => {
    setShowLimitModal(false);
    navigate("/apueda/subinfo");
  };
  const handleCloseLimitModalNo = () => {
    setShowLimitModal(false);
    navigate("/");
  };

  const handleConfirmYes = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmModal(false);
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false);
    if (!isSubscribed) {
      navigate("/");
    }
  };

  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, []);

  const childRefs = useMemo(
    () =>
      Array(cardList.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cardList.length]
  );

  useEffect(() => {
    // 2. 정기구독여부 확인
    const checkSubscription = async () => {
      try {
        const response = await AxiosApi.checkSubscribe();
        setIsSubscribed(response.data); // 구독 여부 상태 업데이트
      } catch (error) {
        console.log(error);
      }
    };
    checkSubscription();


    // 3.유저정보 가져오기
    const showUserInfo = async () => {
      try {
        const response = await AxiosApi.getCardList(myEmail); // AxiosApi에서 사용자 정보를 가져옴
        const userList = response.data.map((user) => ({
          email: user.email,
          nickname: user.nickname,
          url: user.profileImgPath,
          skill: user.skill,
          info: user.myInfo,
        }));
        setCardList(userList); // 변환된 데이터를 카드에 넣어줌
        setCurrentIndex(userList.length - 1);
        currentIndexRef.current = userList.length - 1; 
      } catch (error) { // 백앤드에서도 구독여부를 확인하여 1회 이용후 다시 페이지에 접속하면 429 error 반환해줌
        console.log(error);
        if (error.response){
          switch (error.response.status){
            case 429:
              setShowLimitModal(true); 
              break;
          }
        }
      }
    };
    showUserInfo();
  }, [myEmail]);
  useEffect(() => {
    if (currentIndex === -1) {
      // 카드가 더이상 없으면 마지막카드가 사라지고 알림 출력위해 지연시간 설정
      setTimeout(() => {
        // 비구독자가 무료 사용 이미 한 경우
        if (!isSubscribed && hasUsedFreeTrial) {
          setModalMessage("더이상 카드가 없습니다. 24시간 후에 다시 이용해 주세요.");
          setShowConfirmModal(true);
          setConfirmAction(() => () => navigate("/"));
        } else {
          if (!isSubscribed) {
            setModalMessage(
              "모든 친구 신청을 보내고 메인페이지로 이동하시겠습니까? (취소 시 페이지이동 X)"
            );
            setConfirmAction(() => async () => {
              likedList.forEach(async (user) => {
                try {
                  await AxiosApi.friendRequest(myEmail, user.email);
                } catch (error) {
                  console.error("Error sending friend request:", error);
                }
              });
              unlikedList.forEach(async (user) => {
                try {
                  await AxiosApi.unlikeFriendRequest(myEmail, user.email);
                } catch (error) {
                  console.error("Error sending friend request:", error);
                }
              });
              navigate("/");
              setHasUsedFreeTrial(true);
            });
          } else {
            setModalMessage("추가로 유저를 확인하겠습니까?");
            setConfirmAction(() => async () => {
              likedList.forEach(async (user) => {
                try {
                  await AxiosApi.friendRequest(myEmail, user.email);
                } catch (error) {
                  console.error("Error sending friend request:", error);
                }
              });
              unlikedList.forEach(async (user) => {
                try {
                  await AxiosApi.unlikeFriendRequest(myEmail, user.email);
                } catch (error) {
                  console.error("Error sending friend request:", error);
                }
              });
              window.location.reload();
            });
          }
          setShowConfirmModal(true);
        }
      }, 1500);
    }
  }, [currentIndex, likedList, unlikedList, myEmail, isSubscribed, hasUsedFreeTrial]);

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    if (direction === "right") {
      setLikedList((prev) => [...prev, cardList[index]]);
    } else if (direction === "left") {
      // 왼쪽으로 넘겼을 때 실행 함수 (싫어요)
      setUnlikedList((prev) => [...prev, cardList[index]]);
    }
  };
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  // set last direction and decrease current index
  const outOfFrame = (nickname, idx) => {
    console.log(`${nickname} (${idx}) 카드 제거!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };
  const canGoBack = currentIndex < cardList.length - 1;
  const canSwipe = currentIndex >= 0;
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cardList.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    const lastCard = cardList[newIndex];

    if (lastDirection === "right") {
      setLikedList((prev) =>
        prev.filter((user) => user.nickname !== lastCard.nickname)
      );
    } else if (lastDirection === "left") {
      setUnlikedList((prev) =>
        prev.filter((user) => user.nickname !== lastCard.nickname)
      );
    }

    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Body>
      <PhoneFrame>
        <Title>
          <div>매일 새롭게 만나는 5명의 아프다맨~</div>
        </Title>
        <Window>
          {cardList.map((character, index) => {
          const skills = character.skill.split(",");
          const firstSkill = skills[0];
          const remainingSkills = skills.length - 1;
          return (
            
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.nickname}
              onSwipe={(dir) => swiped(dir, character.nickname, index)}
              onCardLeftScreen={() => outOfFrame(character.nickname, index)}
            >
              <CardImage imageUrl={character.url || defaultImage} className="card">
                <SpanBox>
                  <Span>
                    {character.nickname}
                    <br />
                  </Span>
                  <Span>
                  # {firstSkill}
                  {remainingSkills > 0 && ` (+${remainingSkills})`}
                    <br />
                  </Span>
                  <Span>
                    {character.info}
                    <br />
                  </Span>
                </SpanBox>
              </CardImage>
            </TinderCard>
            )})}
        </Window>
        <ButtonArea>
          <Buttons>
            <button
              style={{ backgroundColor: !canSwipe && "#a1a1a1" }}
              onClick={() => swipe("left")}
            >
              PASS
            </button>
            <button
              style={{
                backgroundColor: !canGoBack && "#a1a1a1",
              }}
              onClick={() => goBack()}
            >
              <FaArrowRotateLeft color="#000000" />
            </button>
            <button
              style={{
                backgroundColor: !canSwipe && "#a1a1a1",
              }}
              onClick={() => swipe("right")}
            >
              LIKE
            </button>
          </Buttons>
          {lastDirection ? (
            <ResultBox key={lastDirection}>
              You swiped {lastDirection}
            </ResultBox>
          ) : (
            <ResultBox>모든 카드를 넘겨주세요!</ResultBox>
          )}
        </ButtonArea>
      </PhoneFrame>
      {showLimitModal && (
        <ModalOverlay>
          <ModalContent>
            <p>일일 이용횟수를 초과했습니다.</p>
            <p>정기구독 페이지로 이동하시겠습니까?</p>
            <button onClick={handleCloseLimitModalYes}>예</button>
            <button onClick={handleCloseLimitModalNo}>아니요</button>
          </ModalContent>
        </ModalOverlay>
      )}
      {showConfirmModal && (
        <ModalOverlay>
          <ModalContent>
            <p>{modalMessage}</p>
            <button onClick={handleConfirmYes}>예</button>
            <button onClick={handleConfirmNo}>아니요</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Body>
  );
}
export default DatingApp;

const Body = styled.div`
  width: auto;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (max-width:500px){
    width: 95vw;
    height: 100svh;
  }
`;
const PhoneFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 30vw;
  height: 85vh;
  background-image: linear-gradient(
    to right,
    #ff5253 0%,
    rgb(255, 60, 100) 90%
  );
  border-radius: 4dvi;

  & * {
    user-select: none;
  }

  @keyframes popup {
    0% {
      transform: scale(1, 1);
    }
    10% {
      transform: scale(1.1, 1.1);
    }
    30% {
      transform: scale(0.9, 0.9);
    }
    50% {
      transform: scale(1, 1);
    }
    57% {
      transform: scale(1, 1);
    }
    64% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @media (max-width:500px){
    width: 78vw;
    height: 90vh;
    border-radius: 5dvi;
  }
`;
// 앱모양 창 내부 와이드값 Window, Title, BottonArea
const widthvalue = "28.5vw";
const mobilewidthvalue = "73vw"
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${widthvalue};
  height: 10vh;
  background-color: white;
  border-radius: 3.3vi 3.3vi 0 0;
  margin-top: 1vh;
  padding-top: 1vh;
  & div {
    font-size: 1.5vw;
  }
  @media (max-width:500px){
    width: ${mobilewidthvalue};
    height: 6vh;
    & div {font-size: 4vw};
  }
`;

const Window = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${widthvalue};
  height: 60vh;
  background-color: white;
  & > :nth-child(1) {
    background-color: rgb(255, 70, 130);
  }

  & > :nth-child(2) {
    background-image: linear-gradient(to top, #11fbc8 0%, #007bcb 100%);
  }

  & > :nth-child(3) {
    background-image: linear-gradient(to right, #6a11cb 10%, #2575fc 100%);
  }
  @media (max-width:500px){
    width: ${mobilewidthvalue};
    height: 82vh;
  }
`;

// 카드 이미지 설정
const CardImage = styled.div`
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 절대위치의 카드를 가운데 정렬하기 위해 사용
  width: 20vw;
  height: 55vh;
  border-radius: 2vh;
  box-sizing: border-box;
  box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: center;
  background-repeat: space;
  background-image: url(${(props) => props.imageUrl});
  @media (max-width:500px) {
    width: 70vw;
    height: 65vh;
  }
`;
const ButtonArea = styled.div`
  width: ${widthvalue};
  height: 12vh;
  background-color: white;
  border-radius: 0 0 3.3vi 3.3vi;
  white-space: nowrap;
  margin-bottom: 1vh;
  padding-bottom: 3vh;
  @media (max-width:500px){
    width: ${mobilewidthvalue};
    height: 10vh;
    margin-bottom: 2vh;
    padding-bottom: 10vh;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: center; // 좌우 가운데 정렬
  /* align-items: flex-end; */
  margin-top: auto; // 부모가 column방향이고 자식이 margin-top : auto면 맨 아래 위치
  margin-bottom: 1vh;
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  & button {
    display: flex;
    justify-content: center; // 좌우 가운데 정렬
    align-items: center;
    width: 10vw;
    height: 6vh;
    text-align: center;
    border: 0.5vw solid #ff5253;
    border-radius: 3vw;
    font-size: 3vmin;
    font-weight: bolder;
    color: #ffffff;
    -webkit-text-stroke: 0.3vh #000000;
    background-color: #ffffff;
    transition: 200ms;
    margin: 0 0.5vw;
    white-space: nowrap;
    flex-shrink: 1; /* 버튼이 부모 크기에 맞춰 작아지도록 설정 */
    flex-grow: 1;
    cursor: pointer;
  }
  :hover {
    transform: scale(1.05);
  }
  @media (max-width:500px){
    width: ${mobilewidthvalue};
    height: 5vh;
    margin-bottom: 1vh;
    & button{
      width: 10vw;
      height: 6vh;
      font-size: 5vmin;
      border-radius: 5vw;
      border: 1vw solid #ff5253;
      margin: 0 1vw;
    }
  }
`;
const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5vw;
  color: #000;
  animation-name: popup;
  animation-duration: 800ms;
  flex-shrink: 1; /* 버튼이 부모 크기에 맞춰 작아지도록 설정 */
  flex-grow: 1;
  @media (max-width:500px){
    font-size: 4vmin;
    
  }
`;
//카드 내부 정보 정렬
const SpanBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 50%;
  font-size: 2vh;
  bottom: 0;
  margin: 5vh 0 0 0;
  color: #fff;
  background-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgb(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.8) 100%
  ); // %는 처음기준 위치

  & span:nth-child(1){
    font-size: 2vw;
    margin-bottom: 1vh;
  }
  & span:nth-child(2){
    font-size: 1.8vw;
    margin-bottom: 1vh;
  }
  & span:nth-child(3){
    font-size: 1vw;
    margin-bottom: 5vh;
  }
  @media (max-width:500px){
    & span:nth-child(1){
    font-size: 8vw;
    margin-bottom: 1vh;
  }
  & span:nth-child(2){
    font-size: 5vw;
    margin-bottom: 1vh;
  }
  & span:nth-child(3){
    font-size: 4vw;
  }
  }
`;
const Span = styled.span`
  display: flex;
  align-self: flex-start;
  justify-content: left;
  text-align: left;
  margin-left: 1vw;
  @media (max-width:500px){
    margin-left: 5vw;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  & p {
    font-size: 1.5em;
    margin-bottom: 2vh;
  }
  & button {
    padding: 1vh 5vw;
    font-size: 1em;
    background: #ff5253;
    color: white;
    border: none;
    border-radius: 5vw;
    cursor: pointer;
    margin: 0 2vw;
  }
  @media (max-width: 500px){
    font-size: 2.5vw;
    width: 80vw;
  }
`;
