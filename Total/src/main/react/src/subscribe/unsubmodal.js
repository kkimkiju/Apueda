import styled from "styled-components";
import Logosidefont from "../components/logosidefont";
import PaymentApi from "../api/PaymentAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    width: 45%;
    height: 90%;
    margin: 0 auto;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    header {
      text-align: right;
    }
    label {
      font-size: 18px;
      position: absolute;
      right: 15px;
    }
  }
  @media (max-width: 500px) {
    section {
      width: 100%;
      height: 100%;
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
  background-color: #ffffff;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: 0;
  font-size: 25px;
  margin-right: 5%;
  margin-top: 5%;
`;
const Unsubbox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Textbox = styled.div`
  font-size: 15px;
  text-align: center;
`;

const Uninfo = styled.div`
  width: 80%;
  height: 60%;
  background-color: #ced4da;
  margin-top: 10%;
`;
const Unbutton = styled.button`
  outline: none;
  color: #000000;
  background-color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  width: 150px;
  height: 50px;
  border: 2px solid #f92f23;
  background-color: white;
  margin-top: 40px;
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

const Unsubmodal = (props) => {
  const { open, close, header, deadLine, merchantuid, member } = props;
  const navigate = useNavigate();

  const confirm = () => {
    navigate("/apueda");
  };
  const mysu = () => {
    navigate("/apueda/mysub");
  };

  const status = "해지";

  const unSavesub = async () => {
    try {
      // 3. IAMPORT 토큰 요청
      const tokenResponse = await axios.post(
        "http://3.37.1.53:5000/api/iamport/getToken",
        {}, // 데이터는 비어 있어도 됩니다.
        { withCredentials: true } // credentials 포함
      );
      const iamportToken = tokenResponse.data.response.access_token;

      // 4. 결제 예약 해지 요청
      const unscheduleResponse = await axios.post(
        "http://3.37.1.53:5000/api/iamport/unschedulePayment",
        { customer_uid: member, merchant_uid: merchantuid },
        {
          headers: {
            Authorization: iamportToken,
            "Content-Type": "application/json",
          },
          withCredentials: true, // credentials 포함
        }
      );
      console.log("예약해지:", unscheduleResponse.data);

      const rsp = await PaymentApi.unsavesub(status);
      if (rsp.data) {
        alert("아프다 구독 해지");
        confirm();
      } else {
        alert("아프다 구독 해지에 실패 하셨습니다. 다시 시도해 주세요.");
        mysu();
      }
    } catch (error) {
      console.error(error);
      alert("아프다 구독 해지에 실패 하셨습니다. 다시 시도해 주세요.");
      mysu();
    }
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              <Button onClick={close}>X</Button>
            </header>
            <Unsubbox>
              <Logosidefont />
              <Textbox style={{ fontSize: "20px", fontWeight: "bold" }}>
                아프다 구독을 정말 해지하시겠어요?
              </Textbox>
              <Textbox>남은 구독은 {deadLine}일 까지입니다.</Textbox>
              <Uninfo>
                <Unsubinfoul>
                  <Unsubinfoli>무제한 개발자 매칭</Unsubinfoli>
                  <Unsubinfoli>광고 없는 아프다</Unsubinfoli>
                  <Unsubinfoli>아무 조건없이 상대 프로필 보기</Unsubinfoli>
                  <Unsubinfoli>언제든지 다시 구독 하실수 있어요.</Unsubinfoli>
                </Unsubinfoul>
              </Uninfo>
              <Unbutton onClick={unSavesub}>해지</Unbutton>
            </Unsubbox>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Unsubmodal;
