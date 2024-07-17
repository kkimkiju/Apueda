import styled from "styled-components";
import Useterms from "./Useterms";
import { useState } from "react";
import Privacy from "./Privacy";
import { FaGithub } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import ccl from "../../src/image/img_cc_by_nc_nd.png";

const Footer = () => {
  const [terOpen, setTerOpen] = useState(false);
  const [termodalOpen, setTermodalOpen] = useState(false);
  const [termodalContent, setTermodalContent] = useState("");
  const [priOpen, setPriOpen] = useState(false);
  const [primodalOpen, setPrimodalOpen] = useState(false);
  const [primodalContent, setPrimodalContent] = useState("");

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false); // 호버 상태 추가

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

  const githubfrontUrl = "https://github.com/tpgh1554/Comprehensive_front";
  const githubbackUrl = "https://github.com/kimfjd/Comprehensive_back";
  const front = () => {
    window.open(githubfrontUrl, "_blank");
  };

  const back = () => {
    window.open(githubbackUrl, "_blank");
  };

  return (
    <Container>
      <Box style={{ marginBottom: "20px" }}>
        <Terms onClick={onClickSub}>이용약관</Terms>
        <Terms style={{ marginLeft: "20px" }} onClick={onClickSub1}>
          개인정보처리방침
        </Terms>
      </Box>
      {/* <Box style={{ marginBottom: "15px" }}>
        <a
          onClick={front}
          style={{
            cursor: "pointer",
            margin: 0,
            marginRight: "90px",
            padding: 0,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FaGithub size={32} color="black" />
          <HoverMessage isHovered={isHovered}>프론트</HoverMessage>{" "}
        </a>
        <a
          onClick={back}
          style={{ cursor: "pointer", margin: 0, padding: 0 }}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <FaSquareGithub size={32} color="black" />
          <HoverMessage1 isHovered={isHovered1}>back</HoverMessage1>
        </a>
      </Box> */}
      <Item>(주) 아프다</Item>

      <Box style={{ flexDirection: "column" }}>
        <Item>
          <a href="https://github.com/kkimkiju">김기주 <FaGithub/></a> |
          <a href="https://github.com/limfarmer"> 임정후 <FaGithub/></a> |
          <a href="https://github.com/kimfjd"> 김동환 <FaGithub/></a> |
          <a href="https://github.com/dzface"> 강인구 <FaGithub/></a> |
          <a href="https://github.com/tpgh1554"> 김세호 <FaGithub/></a>
        </Item>
        <Item>서울특별시 강남구 역삼로</Item>
        <Item>전화번호 02-123-4567</Item>
        <Item>이메일 : apueda@naver.com</Item>
      </Box>
      <Box style={{ flexDirection: "row", justifyContent:"space-between" }}>
        <Item>CopyRight 2024 APUEDA TEAM All Rights Reserved.</Item>
        <Item><img src={ccl} alt="" /></Item>
      </Box>

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
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-top: .2rem solid black;
  // background-image: linear-gradient(to top,#ff5253 0%,rgba(100, 60, 255, 1) 90%);
  width: 100%;
  height: 350px;
  /* color: white; */
  @media (max-width:500px){
    &>div:nth-child(5){
      flex-direction: column;
    }
  }
`;

const Box = styled.div`
  display: flex;
  position: relative;
`;

const Item = styled.span`
  margin-bottom: 7px;
  font-size: 18px;
  &>a{
    text-decoration: none;
    color: initial;
  }
  @media (max-width:500px){
    font-size: 3.5vw;
  }
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

const HoverMessage = styled.span`
  position: absolute;
  bottom: 40px;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1000;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;
`;
const HoverMessage1 = styled.span`
  position: absolute;
  bottom: 40px;
  left: 150px;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 1000;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;
`;
