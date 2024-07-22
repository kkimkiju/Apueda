import React, { useState } from "react";
import PaymentApi from "../api/PaymentAxios";
import axios from "axios";
import styled from "styled-components";
import Kapay from "../image/kakaopaymark-removebg-preview.png";
import CheckModal from "./checkmodal";
import { useNavigate } from "react-router-dom";

const Paybu = styled.button`
  width: 40%;
  height: 45px;
  background-color: white;
  border: 1px solid #dee2e6;
  display: flex;
  position: absolute;
  font-size: 20px;
  left: 2px;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
  img {
    height: 70%;
    margin-right: 50px;
  }
  @media (max-width: 500px) {
    width: 50%;
    font-size: 20px;
    img {
      margin: 0;
    }
  }
  @media (max-width: 429px) {
    width: 50%;
    font-size: 13px;
    img {
      margin: 0;
    }
  }
`;
const Payment = ({ isChecked1, isChecked2, close }) => {
  const buyer_email = localStorage.getItem("email");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const confirm = () => {
    close();
    navigate("/apueda");
  };

  const handleButtonClick = () => {
    if (isChecked1 && isChecked2) {
      Kakaopayment();
    } else {
      alert("약관동의를 전부 체크해 주세요");
    }
  };

  const handlePayment = () => {
    const { IMP } = window;
    IMP.init("imp63702282"); // 포트원 테스트 가맹점 식별코드

    const paymentData = {
      pg: "html5_inicis.INIBillTst", // KG이니시스 테스트 상점아이디
      pay_method: "card", // 결제 수단 (카드)
      merchant_uid: `order_monthly_${new Date().getTime()}`, // 가맹점 주문번호 (고유한 값)
      name: "최초인증결제", // 상품명
      amount: 10, // 결제 금액 (실제 승인은 되지 않음)
      customer_uid: "your-customer-unique-id", // 고객 고유 ID (필수)
      buyer_email: "iamport@siot.do", // 구매자 이메일
      // buyer_name: "아임포트", // 구매자 이름
      // buyer_tel: "02-1234-1234", // 구매자 전화번호
      m_redirect_url: "https://www.my-service.com/payments/complete/mobile", // 모바일에서 결제 완료 후 리디렉션 될 URL
    };

    IMP.request_pay(paymentData, handleResponse);
  };

  const handleResponse = (response) => {
    if (response.success) {
      const paymentData = {
        name: "your-service-name",
        customer_uid: "your-customer-unique-id",
        merchant_uid: `order_${new Date().getTime()}`,
        amount: 10, // 실제 결제 금액
      };

      PaymentApi.subscribePaymentsAgain(paymentData)
        .then((res) => {
          alert("결제 성공");
          const paymentHistory = {
            email: response.buyer_email,
            paymentDate: new Date(),
            paymentStatus: "success",
            transactionId: response.imp_uid,
            amount: paymentData.amount,
            cancellationDate: null,
          };

          return PaymentApi.savePaymentHistory(paymentHistory);
        })
        .then(() => {
          alert("결제 내역 저장 완료");
        })
        .catch((error) => {
          console.error("결제 실패", error);
          alert("결제 실패");
        });
    } else {
      alert(`빌링키 발급 실패: ${response.error_msg}`);
    }
  };

  const Kakaopayment = async () => {
    const { IMP } = window;
    IMP.init("imp63702282"); // 포트원 테스트 가맹점 식별코드

    const merchant = `mid_${new Date().getTime()}`;
    const paymentData = {
      pg: "kakaopay", // 카카오페이 사용 시 'kakaopay'로 설정
      pay_method: "card", // 결제 수단 (카드, 계좌이체, 가상계좌 등)
      merchant_uid: merchant, // 가맹점 주문번호 생성
      name: "아프다 1달 구독", // 상품명
      customer_uid: buyer_email,
      amount: 10, // 결제 금액
      buyer_id: buyer_email, // 구매자 ID 설정
      m_redirect_url: "http://www.apueda.shop/apueda", // 결제 완료 후 이동할 페이지 URL
    };

    // 3. IAMPORT 토큰 요청
    const tokenResponse = await axios.post(
      "http://api.apueda.shop/api/iamport/getToken",
      {}, // 데이터는 비어 있어도 됩니다.
      { withCredentials: true } // credentials 포함
    );
    const iamportToken = tokenResponse.data.response.access_token;

    const regitem = await axios.post(
      "http://api.apueda.shop/api/iamport/preparePayment",
      { merchant_uid: merchant, amount: 10 },
      {
        headers: {
          Authorization: iamportToken,
          "Content-Type": "application/json",
        },
        withCredentials: true, // credentials 포함
      }
    );
    console.log("사전검정데이터 등록 성공", regitem.data);

    IMP.request_pay(paymentData, async (response) => {
      if (response.success) {
        alert("결제해주셔서 감사합니다");
        localStorage.setItem("subscribeStatus", true);
        confirm();
      } else {
        close();
        alert("결제에 실패 하셨습니다");
      }
    });
  };

  return (
    <>
      {/* <Paybu onClick={handlePayment}>KG 이니시스 결제하기</Paybu> */}
      <Paybu onClick={handleButtonClick}>
        <img src={Kapay} alt="카카오 결제하기" />
        KakaoPay
      </Paybu>
    </>
  );
};

export default Payment;
