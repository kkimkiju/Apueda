import styled from "styled-components";
import exit from "../image/exit.png";

import AxiosApi from "../api/AxiosApi";
import { useEffect, useState } from "react";

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
  justify-content: center;
  width: 50vw;
  min-height: 38vw;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid #ff5353;
  border-radius: 100px;
  z-index: 1000;

  @media (max-width: 900px) {
    width: 60vw;
    min-height: 700px;
  }
  @media (max-width: 500px) {
    width: 80vw;
    min-height: 500px;
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

const TitelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 4vw;
  color: white;
  border-radius: 30px;
  background-color: #ff5353;
  font-size: 13px;

  @media (max-width: 900px) {
    font-size: 10px;
    width: 30vw;
    height: 6vh;
    top: 20px;
  }
  @media (max-width: 500px) {
    font-size: 10px;
    width: 50vw;
    height: 6vh;
    top: 20px;
  }
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 25px;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const ProfileImage = styled.div`
  margin-top: 20px;
  img {
    width: 120px;
    height: 120px;

    border-radius: 30%;
  }

  @media (max-width: 500px) {
    img {
      width: 100px;
      height: 100px;
    }
  }
`;

const Myprofile = ({ closeModal }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setUserInfo(rsp.data); // API로부터 받은 데이터를 상태에 저장
        if (rsp.data && rsp.data.profileImgPath) {
          setImageUrl(rsp.data.profileImgPath);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <ContainerBack>
      <Container>
        <TitelBox>
          <h1>나의 프로필</h1>
        </TitelBox>

        <ProfileImage>
          <img src={imageUrl} alt="User Profile" />
        </ProfileImage>
        <UserBox>
          {userInfo && (
            <div>
              <div>
                <p>이름 : {userInfo.name}</p>
                <p>닉네임 : {userInfo.nickname}</p>
                <p>이메일 : {userInfo.email}</p>
                <p>스킬 : {userInfo.skill}</p>
              </div>
            </div>
          )}
        </UserBox>

        <Exit onClick={() => closeModal()} src={exit} />
      </Container>
    </ContainerBack>
  );
};

export default Myprofile;
