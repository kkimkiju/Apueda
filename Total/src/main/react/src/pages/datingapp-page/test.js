import React, { useState, useEffect, useMemo, useRef, useContext, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import TinderCard from "react-tinder-card";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../image/alien2.png";

function DatingApp() {
  const [cardList, setCardList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [unlikedList, setUnlikedList] = useState([]);
  const [myEmail, setMyEmail] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const currentIndexRef = useRef(currentIndex);
  const [key, setKey] = useState(0); // 렌더링 강제 상태

  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;

  const handleError = (error) => {
    if (error.response && error.response.status === 429) {
      setShowLimitModal(true);
    }
  };

  const handleCloseLimitModalYes = () => {
    setShowLimitModal(false);
    navigate("/apueda/subinfo");
  };

  const handleCloseLimitModalNo = () => {
    setShowLimitModal(false);
    navigate("/");
  };

  const childRefs = useMemo(
    () =>
      Array(cardList.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cardList.length]
  );

  const handleConfirmYes = async () => {
    if (confirmAction) {
      await confirmAction();
    }
    setShowConfirmModal(false);
    if (!isSubscribed) {
      try {
        await AxiosApi.startTimeLimit(myEmail);
        console.log("Time limit started for non-subscriber");
      } catch (error) {
        console.error("Failed to start time limit", error);
      }
    }
  };

  const handleConfirmNo = () => {
    setShowConfirmModal(false);
    if (!isSubscribed) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, [loginStatus, navigate]);

  useEffect(() => {
    const getMyEmail = async () => {
      try {
        const response = await AxiosApi.getUserInfo2();
        setMyEmail(response.data.email);
        console.log("myemail : ", response.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    getMyEmail();
  }, []);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await AxiosApi.checkSubscribe();
        setIsSubscribed(response.data);
        console.log("정기구독여부 :", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkSubscription();

    const showUserInfo = async () => {
      try {
        const response = await AxiosApi.getCardList(myEmail);
        const userList = response.data.map((user) => ({
          email: user.email,
          nickname: user.nickname,
          url: user.profileImgPath,
          skill: user.skill,
          info: user.myInfo,
        }));
        setCardList(userList);
        setCurrentIndex(userList.length - 1);
        console.log(`카드리스트 :`, userList);
        currentIndexRef.current = userList.length - 1);
      } catch (error) {
        console.log(error);
        handleError(error);
      }
    };
    showUserInfo();
  }, [myEmail]);

  const sendFriendRequests = useCallback(async () => {
    for (const user of likedList) {
      try {
        await AxiosApi.friendRequest(myEmail, user.email);
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    }
    for (const user of unlikedList) {
      try {
        await AxiosApi.unlikeFriendRequest(myEmail, user.email);
      } catch (error) {
        console.error("Error sending unlike request:", error);
      }
    }

    if (!isSubscribed) {
      try {
        await AxiosApi.startTimeLimit(myEmail);
        console.log("Time limit started for non-subscriber");
      } catch (error) {
        console.error("Failed to start time limit", error);
      }
    }
  }, [likedList, unlikedList, myEmail, isSubscribed]);

  const handleEndOfCards = useCallback(() => {
    setTimeout(() => {
      if (isSubscribed) {
        setModalMessage("카드가 모두 소진되었습니다. 친구신청 후 새카드를 받겠습니까?");
        setConfirmAction(() => async () => {
          await sendFriendRequests();
          setKey(prevKey => prevKey + 1); // 렌더링 강제 상태 변경
        });
      } else if (!isSubscribed) {
        setModalMessage("카드가 모두 소진되었습니다. 친구신청 후 홈페이지로 이동하시겠습니까?");
        setConfirmAction(() => async () => {
          await sendFriendRequests();
          navigate("/");
        });
      }
      setShowConfirmModal(true);
    }, 1500);
  }, [isSubscribed, sendFriendRequests, navigate]);

  useEffect(() => {
    if (currentIndex === -1) {
      handleEndOfCards();
    }
  }, [currentIndex, handleEndOfCards]);

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    if (direction === "right") {
      setLikedList((prev) => [...prev, cardList[index]]);
    } else if (direction === "left") {
      setUnlikedList((prev) => [...prev, cardList[index]]);
    }
  };
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const outOfFrame = (nickname, idx) => {
    console.log(`${nickname} (${idx}) 카드 제거!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };
  const canGoBack = currentIndex < cardList.length - 1;
  const canSwipe = currentIndex >= 0;
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cardList.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

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
    <Body key={key}>
      <PhoneFrame>
        <Title>
          <div>매일 새롭게 5명의 인연찾기</div>
        </Title>
        <Window>
          {cardList.map((character, index) => {
            const skills = character.skill.split(",").join(", ");
            return (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.nickname}
                onSwipe={(dir) => swiped(dir, character.nickname, index)}
                onCardLeftScreen={() => outOfFrame(character.nickname, index)}
              >
                <CardImage
                  imageUrl={character.url || defaultImage}
                  className="card"
                >
                  <SpanBox>
                    <Span>
                      {character.nickname}
                      <br />
                    </Span>
                    <Span># skill</Span>
                    <Span>
                      <Skill>{skills}</Skill>
                      <br />
                    </Span>
                    <Span>
                      {character.info}
                      <br />
                    </Span>
                  </SpanBox>
                </CardImage>
              </TinderCard>
            );
          })}
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
  @media (max-width: 500px) {
    width: 100%;
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
  @media (max-width: 500px) {
    width: 100vw;
    height: 90vh;
    border-radius: 5dvi;
  }
`;
const widthvalue = "28.5vw";
const mobilewidthvalue = "95vw";
const Title = styled.div`
  font-weight: 600;
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
  @media (max-width: 500px) {
    width: ${mobilewidthvalue};
    height: 6vh;
    & div {
      font-size: 4vw;
    }
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
  @media (max-width: 500px) {
    width: ${mobilewidthvalue};
    height: 82vh;
  }
`;

const CardImage = styled.div`
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20vw;
  height: 55vh;
  border-radius: 2vh;
  box-sizing: border-box;
  box-shadow: 0px 0px 2vw 0px rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.imageUrl});
  @media (max-width: 500px) {
    width: 78vw;
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
  @media (max-width: 500px) {
    width: ${mobilewidthvalue};
    height: 10vh;
    margin-bottom: 2vh;
    padding-bottom: 10vh;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: row !important;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 1vh;
  width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
  & button {
    display: flex;
    justify-content: center;
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
    flex-shrink: 1;
    flex-grow: 1;
    cursor: pointer;
  }
  :hover {
    transform: scale(1.05);
  }
  @media (max-width: 500px) {
    width: ${mobilewidthvalue};
    height: 5vh;
    margin-bottom: 1vh;
    & button {
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
  flex-shrink: 1;
  flex-grow: 1;
  @media (max-width: 500px) {
    font-size: 4vmin;
  }
`;
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
  background-image: linear-gradient(to bottom, transparent 0%, rgb(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.8) 100%);
  @media (max-width: 500px) {
    width: 78vw;
  }
`;
const Span = styled.span`
  display: block;
  max-width: 100%;
  overflow-x: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 1vw;
  &:nth-child(1) {
    font-size: 1.5vw;
    margin-bottom: 1vh;
  }

  &:nth-child(2) {
    font-size: 1.2vw;
    margin-bottom: 0.2vh;
  }

  &:nth-child(3) {
    display:
