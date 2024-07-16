//mainpage.js
import styled from "styled-components";
import Logo from "../components/logoimg";
import Section from "../components/section";
import SimpleSlider from "../components/SimpleSlider";
import Footer from "../components/Footer";

const Mainpage = () => {
  return (
    <>
      <Body>
        <Container>
          <SimpleSlider />
          <Section />
          <Footer />
        </Container>
      </Body>
    </>
  );
};

export default Mainpage;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  height: auto;
  margin: 0 15vw;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  height: auto;
  @media (max-width: 500px){
    width: 100dvw;
  }
`;
