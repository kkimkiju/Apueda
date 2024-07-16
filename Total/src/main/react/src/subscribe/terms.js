import React from "react";
import styled from "styled-components";

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
    width: 50%;
    height: 100%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #fefae0;
      font-weight: 700;
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
  width: 100px;
  height: 50px;
  background-color: #f92f23;
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
  color: #fff;
  &:hover {
    background-color: #000000;
  }
`;
const TermsContainer = styled.div`
  height: 90%;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: scroll;
`;

const TermsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TermsText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;
const Bubox = styled.div`
  width: 100%;
  height: 10%;

  text-align: center;
`;

const Termsmodal = (props) => {
  const { open, close } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <TermsContainer>
              <TermsTitle>임시 개인 정보 수집 및 이용 약관</TermsTitle>
              <TermsText>
                <strong>1. 수집하는 개인 정보의 항목</strong>
                <br />- 이름, 생년월일, 성별, 연락처, 이메일 주소 등
              </TermsText>
              <TermsText>
                <strong>2. 개인 정보의 수집 및 이용 목적</strong>
                <br />- 회원 관리, 고객 상담, 마케팅 및 광고에의 활용, 서비스
                제공 및 개선
              </TermsText>
              <TermsText>
                <strong>3. 개인 정보의 보유 및 이용 기간</strong>
                <br />- 회원 탈퇴 시까지 또는 관련 법령에 따른 보존 기간 동안
              </TermsText>
              <TermsText>
                <strong>4. 동의 거부 권리 및 불이익</strong>
                <br />- 귀하는 개인 정보 제공에 대한 동의를 거부할 권리가
                있으며, 동의 거부 시 회원 가입 및 일부 서비스 이용에 제한이 있을
                수 있습니다.
              </TermsText>
              <TermsTitle>개인 정보 제공 및 위탁 안내 이용 약관</TermsTitle>
              <TermsText>
                <strong>1. 개인 정보 제공 대상</strong>
                <br />- 제휴사, 서비스 제공자, 광고 파트너 등
              </TermsText>
              <TermsText>
                <strong>2. 제공하는 개인 정보의 항목</strong>
                <br />- 이름, 연락처, 이메일 주소, 서비스 이용 기록 등
              </TermsText>
              <TermsText>
                <strong>3. 개인 정보 제공 목적</strong>
                <br />- 서비스 제공, 맞춤형 광고 및 마케팅, 통계 분석 등
              </TermsText>
              <TermsText>
                <strong>4. 개인 정보의 보유 및 이용 기간</strong>
                <br />- 제공일로부터 회원 탈퇴 시까지 또는 관련 법령에 따른 보존
                기간 동안
              </TermsText>
              <TermsText>
                <strong>5. 동의 거부 권리 및 불이익</strong>
                <br />- 귀하는 개인 정보 제공에 대한 동의를 거부할 권리가
                있으며, 동의 거부 시 일부 서비스 이용에 제한이 있을 수 있습니다.
              </TermsText>
            </TermsContainer>

            <Bubox>
              <Button onClick={close}>닫기</Button>
            </Bubox>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Termsmodal;
