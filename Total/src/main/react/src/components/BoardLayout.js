import styled from "styled-components";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1024px;
  margin: 0 15vw;
  @media screen and (max-width: 1400px) {
    margin: 0 10vw;
  }
  @media screen and (max-width: 860px) {
    margin: 0 6vw;
    font-size: 10px;
  }
  @media screen and (max-width: 500px) {
    margin: 0;
    width: 500px;
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
    margin: 0;
    border: none;
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
