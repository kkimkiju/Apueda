import styled from "styled-components";
import Logo from "../components/logoimg";
import GlobalStyle from "../font/GlobalStyle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Body>
        <Container>
          <Box>
            <LogoContainer onClick={() => navigate("/apueda")}>
              <Logo />
              <Span>아프다</Span>
            </LogoContainer>
          </Box>
        </Container>
      </Body>
    </>
  );
};

export default Header;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 15vw;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  height: auto;
  @media (max-width: 500px){width: 100dvw; height: 10vw;}
`;

const Box = styled.div`
  display: flex;
  width: auto;
  height: auto;
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 2px 0 2vw;
  cursor: pointer;
`;

// 폰트
const Span = styled.span`
  text-align: left;
  font-size: 3.5vw;
  caret-color: transparent; // 커서 깜박임 제거
  font-family: "PyeongChangPeace-Bold", sans-serif;
  @media (max-width: 500px){font-size: 8vw}
`;
