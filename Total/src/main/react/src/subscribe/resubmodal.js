import React, { useState } from "react";
import styled from "styled-components";
import PaymentApi from "../api/PaymentAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Textbox = styled.div`
  font-size: 15px;
  text-align: center;
  @media (max-width: 429px) {
    font-size: 11px;
  }
`;
const Uninfo = styled.div`
  width: 80%;
  height: 45%;
  background-color: #ced4da;
  margin-top: 5%;
`;
const Unsubinfoul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;
const Unsubinfoli = styled.li`
  background-color: none;
  font-size: 15px;
  margin-top: 10%;
  margin-left: 5%;
`;
const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 35%;
    height: 60%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;

    header {
      position: relative;
      height: 10%;
      background-color: #f92f23;
      font-weight: 700;
      align-content: center;
      color: white;
      font-size: 18px;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
  }
  @media (max-width: 500px) {
    section {
      width: 88%;
      height: 70%;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  outline: none;
  color: #000000;
  background-color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid #f92f23;
  background-color: white;
  margin-right: 30px;
  &:hover {
    background-color: #f92f23;
    color: white;
  }
`;

const TerCon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Grayline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dee2e6;
  margin-top: 30px;
`;
const Bubox = styled.div`
  text-align: right;
  width: 100%;
`;

const Privacy = (props) => {
  const { open, close, category, setModalOpen, merchantuid, deadLine } = props;
  const navigate = useNavigate();

  const confirm = () => {
    navigate("/apueda");
  };
  const mysu = () => {
    navigate("/apueda/mysub");
  };

  const status = "구독";
  const date = new Date(deadLine);
  const rebook = Math.floor(date.getTime() / 1000);
  const reSavesub = async () => {
    try {
      // IAMPORT 토큰 요청
      const tokenResponse = await axios.post(
        "http://3.37.1.53:5000/api/iamport/getToken",
        {}, // 데이터는 비어 있어도 됩니다.
        { withCredentials: true } // credentials 포함
      );
      const iamportToken = tokenResponse.data.response.access_token;
      console.log(rebook);
      console.log(merchantuid);
      // 재구독
      const resub = await axios.post(
        "http://3.37.1.53:5000/api/iamport/reschedulePayment",
        { merchant_uid: merchantuid, schedule_at: rebook },
        {
          headers: {
            Authorization: iamportToken,
            "Content-Type": "application/json",
          },
          withCredentials: true, // credentials 포함
        }
      );
      console.log("재예약:", resub.data);
      const rsp = await PaymentApi.unsavesub(status);
      if (rsp.data) {
        alert("아프다 재구독에 성공하셨어요");
        confirm();
      } else {
        alert("아프다 재구독에 실패하셨습니다 재시도 해주세요");
        mysu();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              <button onClick={close}>&times;</button>
            </header>
            <TerCon>
              <Textbox style={{ fontSize: "20px", fontWeight: "bold" }}>
                아프다 재구독을 하시겠습니까?
              </Textbox>
              <Textbox>
                재구독을 하시면 {deadLine}일에 결제 예약이 됩니다.
              </Textbox>
              <Textbox>구독 하시면 다음과 같은 혜택을 얻으실수 있어요.</Textbox>
              <Uninfo>
                <Unsubinfoul>
                  <Unsubinfoli>무제한 개발자 매칭</Unsubinfoli>
                  <Unsubinfoli>광고 없는 아프다</Unsubinfoli>
                  <Unsubinfoli>아무 조건없이 상대 프로필 보기</Unsubinfoli>
                </Unsubinfoul>
              </Uninfo>
              <Grayline />
              <Bubox>
                <Button onClick={reSavesub}>재구독</Button>
              </Bubox>
            </TerCon>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Privacy;
