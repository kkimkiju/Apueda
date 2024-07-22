//NaviBar.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimate, stagger, motion } from "framer-motion";
import AxiosApi from "../api/AxiosApi";
import styled from "styled-components";
import defaultImage from "../image/person-icon2.png";
import file from "../image/file.png";
import chat from "../image/chat.png";
import laptop from "../image/laptop-icon.png";
import phone from "../image/mobile-in-hand.png";
import card from "../image/credit-card.png";
import profile from "../image/profile.png";
import loginIcon from "../image/login-icon.png";
import logout from "../image/logout.png";
import { UserContext } from "../context/UserStore";

export default function NaviBar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const isLoginUser = localStorage.getItem("accessToken") !== null;
  const [isOpen, setIsOpen] = useState(false);
  const [logoutModal, setLoggoutModal] = useState(false); // 모달 상태 추가

  const context = useContext(UserContext);
  const {
    setLoginStatus,
    loginStatus,
    subscribeStatus,
    setSubscribeStatus,
    profileChange,
    setProfileChange,
  } = context;
  // 모달 관리
  const handleCloseModal = () => {
    setLoggoutModal(false);
    navigate("/apueda");
  };
  // 유저정보 갱신
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setUserInfo(rsp.data); // API로부터 받은 데이터를 상태에 저장
        if (rsp.data.profileImgPath) {
          setProfileChange(false);
          setImageUrl(rsp.data.profileImgPath);
          localStorage.setItem("imgUrl", rsp.data.profileImgPath);
        } else {
          setImageUrl(defaultImage);
        }
      } catch (e) {
        console.log(e);
        setImageUrl(defaultImage);
      }
    };
    fetchUserInfo();
  }, [loginStatus, profileChange]);

  const scope = useMenuAnimation(isOpen);

  const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

  function useMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

      animate(
        "ul",
        {
          clipPath: isOpen
            ? "inset(0% 0% 0% 0% round 10px)"
            : "inset(10% 50% 90% 50% round 10px)",
        },
        {
          type: "spring",
          bounce: 0,
          duration: 0.5,
        }
      );

      animate(
        "li",
        isOpen
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
        {
          duration: 0.2,
          delay: isOpen ? staggerMenuItems : 0,
        }
      );
    }, [isOpen]);

    return scope;
  }
  // 로그아웃 시 로컬스토리지 비우고 로그인 상태 변경
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/apueda");
    setLoginStatus("");
    setSubscribeStatus("");
    setLoggoutModal(true);
  };

  const subscribeHandler = () => {
    if (subscribeStatus === true) {
      navigate("/apueda/mysub");
    } else if (subscribeStatus === false) {
      navigate("/apueda/subinfo");
    } else {
      navigate("/apueda/login");
    }
  };

  return (
    <Body>
      <Container className="menu" ref={scope}>
        <Box>
          <motion.button
            style={{
              width: "0vw", // 프로필사진 버튼 영역
              height: "0vw",
              border: 0,
              backgroundColor: "transparent",
              fontSize: "40px",
            }}
            whileHover={{ scale: 1.1 }} // 마우스 호버 시 이미지 커짐
            whileTap={{ scale: 0.95 }} // 클릭 시 이미지 작아짐
            onClick={() => setIsOpen(!isOpen)}
          >
            <ProfileButton>
              <ProfileImage>
                <img src={imageUrl} alt="User Profile" />
              </ProfileImage>
              <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                {/* <svg display="block" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg> */}
              </div>
            </ProfileButton>
          </motion.button>
          <List>
            <ul
              style={{
                pointerEvents: isOpen ? "auto" : "none",
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                listStyle: "none",
              }}
            >
              <MenuItem onClick={() => navigate("/apueda/board")}>
                <Img src={file} />
                <Overlay>게시판</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/chatmanage")}>
                <Img src={chat} />
                <Overlay>오픈채팅</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/mypage/mypj")}>
                <Img src={laptop} />
                <Overlay>프로젝트</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/datingapp")}>
                <Img src={phone} />
                <Overlay>
                  개발자
                  <br /> 매칭
                </Overlay>
              </MenuItem>
              <MenuItem onClick={subscribeHandler}>
                <Img src={card} />
                <Overlay>구독관리</Overlay>
              </MenuItem>
              <MenuItem onClick={() => navigate("/apueda/mypage")}>
                <Img src={profile} />
                <Overlay>내정보</Overlay>
              </MenuItem>
              <MenuItem
                isLoginUser={isLoginUser}
                onClick={() => navigate("/apueda/login")}
              >
                <Img src={loginIcon} />
                <Overlay>로그인</Overlay>
              </MenuItem>
              <MenuItem isLoginUser={!isLoginUser} onClick={logoutHandler}>
                <Img src={logout} />
                <Overlay>로그아웃</Overlay>
              </MenuItem>
            </ul>
          </List>
        </Box>
      </Container>
      {logoutModal && (
        <ModalOverlay>
          <ModalContent>
            <p>로그아웃 되었습니다.</p>
            <button onClick={handleCloseModal}>닫기</button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 15vw;
`;
const Container = styled.div`
  position: fixed;
  z-index: 100;
  display: flex;
  margin: 10vh -90px 0 0; // 네비바 위치
  flex-direction: column;
  align-self: flex-end; /* 자신을 교차축 방향으로 오른쪽 정렬 */
  align-items: center; // 하위 아이템 정렬
  @media (max-width: 500px) {
    margin: 10vh -60px 0 0; // 네비바 위치
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height: auto;
  box-sizing: border-box;
`;

const ProfileButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
`;
const List = styled.div`
  font-size: 40px;

  ul {
    margin-top: 6vw; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
    @media (max-width: 500px) {
      margin-top: 12vw;
    }
  }
  li {
    margin: 0; /* 위아래 간격을 없애고 싶다면 0으로 설정합니다 */
    padding: 0; /* 패딩도 필요에 따라 조정합니다 */
  }
`;
const Arrow = styled.div`
  display: none;
  margin: 0;
`;

const Img = styled.img`
  // 메뉴아이콘 크기
  width: 4vw;
  height: 4vw;
  background-size: contain;
  @media (max-width: 500px) {
    width: 10vw;
    height: 10vw;
  }
`;
const ProfileImage = styled.div`
  img {
    width: 4vw;
    height: 4vw;
    object-fit: cover;
    border-radius: 100%;
    border: 0.5vw solid rgba(150, 150, 150, 0.5);
    @media (max-width: 500px) {
      width: 10vw;
      height: 10vw;
    }
  }
`;
const Overlay = styled.div`
  // 메뉴 아이콘 디자인 영역
  position: absolute;
  color: rgb(255, 255, 255);
  font-size: 1vw;
  opacity: 0;
  transition: opacity 0.3s ease;
  @media (max-width: 500px) {
    font-size: 2.5vw;
  }
`;

const MenuItem = styled(motion.li).withConfig({
  shouldForwardProp: (prop) => !["isLoginUser", "isLogOutUser"].includes(prop),
})`
  // props를 다른 컴포넌트에 전달하지 않도록 막는 코드
  position: relative;
  display: ${(props) =>
    props.isLoginUser
      ? "none"
      : "flex"}; // 로그인 상태이면 안보이고, 로그인 상태이면 보이도록 설정
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgba(150, 150, 255, 0.9);
    border-radius: 50px;
  }

  &:hover ${Img} {
    opacity: 0.5;
  }

  &:hover ${Overlay} {
    opacity: 1;
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: .2vw solid black;
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
  @media (max-width: 500px) {
    font-size: 2.5vw;
    width: 80vw;
  }
`;
