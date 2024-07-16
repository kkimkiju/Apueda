import React, { useRef, useState } from "react";
import styled from "styled-components";
import Useterms from "../components/Useterms";
import Privacy from "../components/Privacy";
import { useNavigate } from "react-router-dom";

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
    height: 50%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      text-align: center;
      padding: 16px 64px;
      background-color: #ff5353;
      font-weight: 700;
    }
    main {
      padding: 16px;
      border-top: 1px solid #dee2e6;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
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
const Addinfobox = styled.div`
  margin-top: 30px;
  position: relative;
`;
const Box = styled.div`
  display: flex;
  position: relative;
`;
const Terms = styled.div`
  font-size: 20px;
  color: gray;
  margin-top: 15px;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
  font-size: 16px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Separator = styled.span`
  font-size: 20px;
  margin: 5px;
`;
const Text1 = styled.div`
  font-size: 15px;
  text-align: left;
`;
const Nickname = styled.input`
  border: 1px solid #ccc;
  width: 30%;
  position: absolute;
  left: 1px;
  height: 25px;
`;
const Boxbox = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
`;
const Butt = styled.button`
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
const Textbox = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const Chbox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Chbox1 = styled.div`
  display: flex;
  margin-top: 30px;
`;

const Addinfomodal = ({ open, close, header, handleAddInfoConfirm }) => {
  const part1Ref = useRef(null);
  const part2Ref = useRef(null);
  const part3Ref = useRef(null);
  const part4Ref = useRef(null);
  const part5Ref = useRef(null);
  const part6Ref = useRef(null);
  const part7Ref = useRef(null);
  const [name, setName] = useState("");
  const [myInfo, setMyInfo] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [terOpen, setTerOpen] = useState(false);
  const [termodalOpen, setTermodalOpen] = useState(false);
  const [termodalContent, setTermodalContent] = useState("");
  const [priOpen, setPriOpen] = useState(false);
  const [primodalOpen, setPrimodalOpen] = useState(false);
  const [primodalContent, setPrimodalContent] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const navigate = useNavigate();
  const skill = ["java"];

  const handleInputChange = (e, targetRef) => {
    if (e.target.value.length === 1 && targetRef.current) {
      targetRef.current.focus();
      updateBirth();
      console.log(identityNumber);
    }
  };

  const handleClose = () => {
    window.Kakao.API.request({
      url: "/v1/user/unlink",
    })
      .then(function (response) {
        console.log(response);
        close(); // Kakao API 요청 후 모달 닫기
      })
      .catch(function (error) {
        console.error(error);
      });
    navigate("/apueda");
  };

  const updateBirth = () => {
    const birthDate = [
      part1Ref.current.value,
      part2Ref.current.value,
      part3Ref.current.value,
      part4Ref.current.value,
      part5Ref.current.value,
      part6Ref.current.value,
      part7Ref.current.value,
    ].join("");
    setIdentityNumber(birthDate);
  };

  const handleintroChange = (e) => {
    setMyInfo(e.target.value);
    console.log(myInfo);
  };

  const handlenameChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleButtonClick = () => {
    updateBirth();
    if (isChecked1 && isChecked2) {
      updateBirth();
      setTimeout(() => {
        handleConfirm();
      }, 0);
    } else {
      alert("약관동의를 전부 체크해 주세요");
    }
  };

  const handleConfirm = () => {
    handleAddInfoConfirm(identityNumber, name, myInfo, skill);
    close();
  };

  const handleCheckboxChange1 = (event) => {
    setIsChecked1(event.target.checked);
  };

  const handleCheckboxChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  const onClickSub = (e) => {
    setTerOpen(true);
    document.body.style.overflow = "hidden"; //모달창 열렸을 때 스크롤 금지
  };

  const closeTer = () => {
    setTerOpen(false);
    document.body.style.overflow = "unset";
  };

  const onClickSub1 = (e) => {
    setPriOpen(true);
    document.body.style.overflow = "hidden"; //모달창 열렸을 때 스크롤 금지
  };

  const closeTer1 = () => {
    setPriOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>{header}</header>
            <Addinfobox>
              <Text1>생년월일</Text1>
              <InputContainer>
                <Input
                  ref={part1Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onChange={(e) => handleInputChange(e, part2Ref)}
                />
                <Input
                  ref={part2Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onChange={(e) => handleInputChange(e, part3Ref)}
                />
                <Input
                  ref={part3Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onChange={(e) => handleInputChange(e, part4Ref)}
                />
                <Input
                  ref={part4Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onChange={(e) => handleInputChange(e, part5Ref)}
                />
                <Input
                  ref={part5Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onChange={(e) => handleInputChange(e, part6Ref)}
                />
                <Input
                  ref={part6Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onChange={(e) => handleInputChange(e, part7Ref)}
                />
                <Separator>-</Separator>
                <Input
                  ref={part7Ref}
                  type="text"
                  maxLength="1"
                  placeholder="X"
                  onKeyDown={(e) => handleInputChange(e, part7Ref)}
                />
                <Separator>******</Separator>
              </InputContainer>
              <Boxbox>
                <Text1>이름</Text1>
                <Nickname
                  type="text"
                  placeholder="성함을 입력해주세요"
                  value={name}
                  onChange={handlenameChange}
                />
              </Boxbox>
              <Boxbox>
                <Text1>소개글</Text1>
                <Nickname
                  type="text"
                  placeholder="자신의 소개글을 입력해주세요"
                  value={myInfo}
                  onChange={handleintroChange}
                />
              </Boxbox>
            </Addinfobox>
            <Box style={{ marginBottom: "20px" }}>
              <Terms onClick={onClickSub}>이용약관</Terms>
              <Terms style={{ marginLeft: "20px" }} onClick={onClickSub1}>
                개인정보처리방침
              </Terms>
            </Box>
            <Chbox1>
              <Textbox>개인 정보 수집 이용 약관</Textbox>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked1}
                  onChange={handleCheckboxChange1}
                />
                동의
              </label>
            </Chbox1>
            <Chbox>
              <Textbox>개인 정보 제공 및 위탁 안내</Textbox>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked2}
                  onChange={handleCheckboxChange2}
                />
                동의
              </label>
            </Chbox>
            <footer>
              <Butt onClick={handleClose}>닫기</Butt>
              <Butt onClick={handleButtonClick}>확인</Butt>
            </footer>
          </section>
        )}
      </div>

      <Useterms
        open={terOpen}
        close={closeTer}
        category="약관창"
        setModalOpen={setTermodalOpen}
        setModalContent={setTermodalContent}
        header="이용약관"
      />
      <Privacy
        open={priOpen}
        close={closeTer1}
        category="약관창"
        setModalOpen={setPrimodalOpen}
        setModalContent={setPrimodalContent}
        header="개인정보취급방침"
      />
    </ModalStyle>
  );
};
export default Addinfomodal;
