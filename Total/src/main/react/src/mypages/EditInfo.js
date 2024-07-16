import styled from "styled-components";
import { useState, useEffect } from "react";
import AxiosApi from "../api/AxiosApi";
// import phone from "../image/phone.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditName = styled.input.attrs({ type: "text", readOnly: true })``;
const EditNickname = styled.input.attrs({ type: "text" })``;
const EditEmail = styled.input.attrs({ type: "text", readOnly: true })``;

// Phone 컴포넌트 스타일 수정
// const Phone = styled.div`
//   position: relative; /* 위치 지정을 위해 필요 */
// `;

// // 이미지 스타일
// const PhoneImage = styled.img`
//   width: 40vw; /* 이미지 너비 조정 */
//   height: 50vw; /* 이미지 높이 자동 설정 */
// `;

const EditInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo();
        setUserInfo(rsp.data); // API로부터 받은 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <>
      <Container>
        {userInfo && (
          <div>
            {userInfo
              .filter(
                (member) => member.email === localStorage.getItem("email")
              )
              .map((member, index) => (
                <div key={index}>
                  <p>이름</p>
                  <EditName placeholder={member.name}></EditName>
                  <p>닉네임</p>
                  <EditNickname placeholder={member.nickname}></EditNickname>
                  <p>이메일</p>
                  <EditEmail placeholder={member.email}></EditEmail>
                  <p>스킬 : {member.skill}</p>
                </div>
              ))}
          </div>
        )}
      </Container>
      ;
    </>
  );
};

export default EditInfo;
