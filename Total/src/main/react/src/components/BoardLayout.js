import styled from "styled-components";
const Layout = styled.div`
  width: 1140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 10vw;
  @media screen and (min-width: 2040px) {
    margin: 0 20vw;
    width: auto;
  }
  @media screen and (max-width: 1440px) {
    margin: 0 10vw;
    width: auto;
  }

  @media screen and (max-width: 860px) {
    margin: 0 5vw;
    font-size: 10px;
    width: auto;
  }
  @media screen and (max-width: 500px) {
    margin-left: 10px;
    width: 330px;
  }
  @media screen and (max-width: 320px) {
    margin-left: 7px;
    width: 280px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  margin-top: 5vh;
  border: 5px solid #ff5353;
  border-radius: 37px;
  background-color: #ff5353;
  @media screen and (max-width: 500px) {
    border-radius: 30px 30px 0 0;
  }
`;
const BoardLayout = ({ children }) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};
export default BoardLayout;
