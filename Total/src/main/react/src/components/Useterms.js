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
    width: 30%;
    height: 80%;
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

  align-items: center;
  width: 100%;
  height: 90%;
`;

const Terbox = styled.div`
  border: 2px solid #e9ecef;
  width: 90%;
  height: 85%;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  /* Custom Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f92f23; /* color of the scroll thumb */
    border-radius: 6px; /* roundness of the scroll thumb */
    border: 3px solid #f1f1f1; /* creates padding around scroll thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #c62d1f; /* color of the scroll thumb when hovered */
  }
`;

const Grayline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dee2e6;
`;
const Bubox = styled.div`
  text-align: right;

  width: 100%;
`;

const Useterms = (props) => {
  const { open, close, header } = props;

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              {header}
              <button onClick={close}>&times;</button>
            </header>
            <TerCon>
              <Terbox>
                <h2>이용약관</h2>
                <h3>제1조 (목적)</h3>
                <p>
                  본 약관은 아프다 (이하 "회사")이 제공하는 모든 서비스(이하
                  "서비스")의 이용과 관련하여 회사와 이용자(이하 "회원") 간의
                  권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로
                  합니다.
                </p>

                <h3>제2조 (용어의 정의)</h3>
                <p>
                  본 약관에서 사용하는 주요 용어의 정의는 다음과 같습니다.
                  <ul>
                    <li>
                      "서비스"라 함은 회사가 제공하는 개발자 매칭 프로그램과
                      관련한 모든 서비스를 의미합니다.
                    </li>
                    <li>
                      "회원"이라 함은 본 약관에 따라 회사와 이용 계약을 체결하고
                      회사가 제공하는 서비스를 이용하는 자를 말합니다.
                    </li>
                    <li>
                      "개인정보"라 함은 식별되거나 식별될 수 있는 회원에 관한
                      정보로서, 이름, 이메일 주소 등을 포함합니다.
                    </li>
                  </ul>
                </p>

                <h3>제3조 (약관의 게시 및 개정)</h3>
                <p>
                  1. 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스
                  초기 화면에 게시합니다. 2. 회사는 필요하다고 인정되는 경우,
                  관련 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수
                  있습니다. 3. 회사가 약관을 개정할 경우에는 적용 일자 및 개정
                  사유를 명시하여 현행 약관과 함께 개정된 약관을 서비스 초기
                  화면에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 4.
                  회원은 개정된 약관에 동의하지 않을 권리가 있으며, 개정된
                  약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수
                  있습니다. 단, 개정된 약관의 효력 발생일 이후에도 서비스를 계속
                  이용할 경우 약관의 개정에 동의한 것으로 간주합니다.
                </p>

                <h3>제4조 (회원가입 및 이용 계약의 성립)</h3>
                <p>
                  1. 서비스 이용을 희망하는 자는 회사가 정한 절차에 따라
                  회원가입을 신청합니다. 2. 회사는 전항에 따라 회원가입을 신청한
                  자 중 다음 각 호에 해당하지 않는 한 회원으로 승인합니다.
                  <ul>
                    <li>
                      가입 신청자가 본 약관에 의하여 이전에 회원 자격을 상실한
                      적이 있는 경우
                    </li>
                    <li>
                      기타 회사가 정한 이용 신청 요건이 충족되지 않았을 경우
                    </li>
                  </ul>
                  3. 이용 계약은 회사의 회원 가입 승낙이 회원에게 도달한 시점에
                  성립합니다.
                </p>

                <h3>제5조 (서비스의 제공 및 변경)</h3>
                <p>
                  1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.
                  <ul>
                    <li>개발자 매칭 서비스</li>
                    <li>프로젝트 관리 서비스</li>
                    <li>
                      기타 회사가 추가 개발하거나 다른 회사와의 제휴 계약 등을
                      통해 회원에게 제공하는 일체의 서비스
                    </li>
                  </ul>
                  2. 회사는 서비스의 내용을 변경할 수 있으며, 변경 내용은
                  회원에게 공지합니다.
                </p>

                <h3>제6조 (서비스 이용 요금)</h3>
                <p>
                  1. 회사가 제공하는 서비스는 기본적으로 무료입니다. 다만,
                  회사는 별도의 유료 서비스 및 유료 기능을 제공할 수 있으며,
                  이에 대한 요금 정책은 별도로 공지합니다. 2. 회원이 유료
                  서비스를 이용하는 경우, 회사가 정한 요금을 지불해야 합니다.
                </p>

                <h3>제7조 (회원의 의무)</h3>
                <p>
                  1. 회원은 본 약관 및 회사의 공지사항, 서비스 이용 안내 등
                  회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에
                  방해되는 행위를 하여서는 안 됩니다. 2. 회원은 다음 각 호의
                  행위를 하여서는 안 됩니다.
                  <ul>
                    <li>
                      서비스 이용 신청 또는 변경 시 허위 내용을 등록하는 행위
                    </li>
                    <li>타인의 정보를 도용하는 행위</li>
                    <li>회사가 게시한 정보를 변경하는 행위</li>
                    <li>
                      회사 기타 제3자의 저작권 등 지적 재산권을 침해하는 행위
                    </li>
                    <li>
                      회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
                    </li>
                    <li>
                      외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에
                      반하는 정보를 서비스에 공개 또는 게시하는 행위
                    </li>
                  </ul>
                </p>

                <h3>제8조 (개인정보 보호)</h3>
                <p>
                  1. 회사는 회원의 개인정보를 보호하기 위해 관련 법령을
                  준수합니다. 2. 회사는 회원의 개인정보를 수집, 이용, 제공하는
                  경우 관련 법령에 따라 회원의 동의를 받습니다.
                </p>

                <h3>제9조 (계약 해지 및 서비스 이용 제한)</h3>
                <p>
                  1. 회원이 서비스 이용 계약을 해지하고자 하는 때에는 언제든지
                  회원 탈퇴를 할 수 있습니다. 2. 회사는 회원이 본 약관의 의무를
                  위반하거나 서비스의 정상적인 운영을 방해한 경우, 사전 통지
                  없이 계약을 해지하거나 서비스 이용을 제한할 수 있습니다.
                </p>

                <h3>제10조 (손해배상)</h3>
                <p>
                  1. 회사는 무료로 제공하는 서비스와 관련하여 회원에게 발생한
                  어떠한 손해에 대해서도 책임을 지지 않습니다. 2. 회사는 유료
                  서비스의 경우, 회사의 고의 또는 중대한 과실로 인하여 발생한
                  손해에 대해서만 책임을 집니다.
                </p>

                <h3>제11조 (면책 조항)</h3>
                <p>
                  1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여
                  서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이
                  면제됩니다. 2. 회사는 회원의 귀책 사유로 인한 서비스 이용
                  장애에 대하여 책임을 지지 않습니다.
                </p>

                <h3>제12조 (분쟁 해결)</h3>
                <p>
                  1. 회사와 회원 간에 발생한 전자상거래 분쟁에 관한 소송은
                  서울중앙지방법원을 관할 법원으로 합니다. 2. 회사와 회원 간에
                  제기된 전자상거래 소송에는 대한민국 법을 적용합니다.
                </p>

                <h3>부칙</h3>
                <p>1. 본 약관은 2024년 7월 5일부터 적용됩니다.</p>

                <h2>개인정보취급방침</h2>
                <h3>제1조 (개인정보의 수집 항목 및 수집 방법)</h3>
                <p>
                  1. **수집하는 개인정보의 항목**
                  <ul>
                    <li>회원가입 시: 이름, 이메일 주소, 비밀번호, 연락처</li>
                    <li>
                      서비스 이용 시: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP
                      정보, 결제 기록 (유료 서비스 이용 시)
                    </li>
                    <li>
                      추가적으로 필요한 경우: 포트폴리오, 기술 스택, 경력 정보
                      등
                    </li>
                  </ul>
                  2. **개인정보 수집 방법**
                  <ul>
                    <li>
                      회원가입 및 서비스 이용 과정에서 회원이 직접 입력한 정보
                    </li>
                    <li>제휴 서비스 또는 단체로부터 제공받은 정보</li>
                    <li>자동 수집 장치를 통해 수집된 정보 (쿠키 등)</li>
                  </ul>
                </p>

                <h3>제2조 (개인정보의 수집 및 이용 목적)</h3>
                <p>
                  회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.
                  <ul>
                    <li>
                      회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별,
                      불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사
                      확인
                    </li>
                    <li>
                      서비스 제공: 개발자 매칭 서비스, 프로젝트 관리, 유료
                      서비스 제공
                    </li>
                    <li>
                      마케팅 및 광고: 신규 서비스 개발 및 맞춤 서비스 제공,
                      이벤트 및 광고성 정보 제공 및 참여 기회 제공
                    </li>
                    <li>통계 분석: 서비스 이용에 대한 통계 분석 및 연구</li>
                  </ul>
                </p>

                <h3>제3조 (개인정보의 보유 및 이용 기간)</h3>
                <p>
                  1. 회원의 개인정보는 회원가입일로부터 서비스를 제공하는 기간
                  동안 보유 및 이용됩니다. 2. 회원이 탈퇴하거나 개인정보의 수집
                  및 이용 목적이 달성된 경우, 해당 정보를 지체 없이 파기합니다.
                  단, 관계 법령에 따라 보관해야 하는 경우, 해당 법령에서 정한
                  기간 동안 보관합니다.
                  <ul>
                    <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                    <li>소비자의 불만 또는 분쟁 처리에 관한 기록: 3년</li>
                    <li>
                      전자상거래 등에서의 소비자 보호에 관한 법률에 따른 거래
                      기록: 5년
                    </li>
                  </ul>
                </p>

                <h3>제4조 (개인정보의 파기 절차 및 방법)</h3>
                <p>
                  1. **파기 절차**
                  <ul>
                    <li>
                      개인정보의 보유 기간이 경과했거나 처리 목적이 달성된 경우,
                      해당 정보를 파기합니다.
                    </li>
                  </ul>
                  2. **파기 방법**
                  <ul>
                    <li>
                      전자적 파일 형태의 정보는 복구 및 재생할 수 없는 기술적
                      방법을 사용하여 삭제합니다.
                    </li>
                    <li>
                      종이 문서에 기록된 개인정보는 분쇄하거나 소각하여
                      파기합니다.
                    </li>
                  </ul>
                </p>

                <h3>제5조 (개인정보의 제3자 제공)</h3>
                <p>
                  회사는 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
                  다만, 다음의 경우에는 예외로 합니다.
                  <ul>
                    <li>회원이 사전에 동의한 경우</li>
                    <li>
                      법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진
                      절차와 방법에 따라 수사 기관의 요구가 있는 경우
                    </li>
                  </ul>
                </p>

                <h3>제6조 (개인정보 처리의 위탁)</h3>
                <p>
                  회사는 서비스 제공을 위하여 필요한 업무 중 일부를 외부 업체에
                  위탁할 수 있습니다. 이 경우, 위탁 계약을 통해 개인정보가
                  안전하게 관리될 수 있도록 필요한 사항을 규정합니다.
                </p>

                <h3>제7조 (회원의 권리와 그 행사 방법)</h3>
                <p>
                  1. 회원은 언제든지 자신의 개인정보를 조회하거나 수정할 수
                  있습니다. 2. 회원은 언제든지 개인정보 제공에 관한 동의를
                  철회할 수 있습니다. 동의 철회 시, 일부 서비스의 이용이 제한될
                  수 있습니다. 3. 개인정보의 조회, 수정, 동의 철회는 회사의
                  고객센터를 통해 가능합니다.
                </p>

                <h3>제8조 (개인정보의 안전성 확보 조치)</h3>
                <p>
                  회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
                  있습니다.
                  <ul>
                    <li>
                      **기술적 조치**: 개인정보의 암호화, 보안 프로그램 설치,
                      접근 통제
                    </li>
                    <li>
                      **관리적 조치**: 개인정보 보호를 위한 내부관리계획 수립 및
                      시행, 직원 교육
                    </li>
                    <li>
                      **물리적 조치**: 전산실 및 자료 보관실 등의 접근 통제
                    </li>
                  </ul>
                </p>

                <h3>제9조 (개인정보 보호 책임자 및 담당자)</h3>
                <p>
                  회사는 회원의 개인정보를 보호하고 개인정보와 관련된 불만을
                  처리하기 위하여 아래와 같이 개인정보 보호 책임자를 지정하고
                  있습니다.
                  <ul>
                    <li>**개인정보 보호 책임자**: [이름, 직위]</li>
                    <li>**연락처**: [전화번호, 이메일 주소]</li>
                  </ul>
                </p>

                <h3>제10조 (개인정보취급방침의 변경)</h3>
                <p>
                  회사는 본 개인정보취급방침을 변경하는 경우, 변경 내용의 시행
                  7일 전부터 서비스 초기 화면 또는 공지사항을 통하여 공지합니다.
                </p>

                <h3>부칙</h3>
                <p>1. 본 방침은 2024년 7월 5일부터 시행됩니다.</p>
              </Terbox>
              <Grayline />
              <Bubox>
                <Button onClick={close}>닫기</Button>
              </Bubox>
            </TerCon>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Useterms;
