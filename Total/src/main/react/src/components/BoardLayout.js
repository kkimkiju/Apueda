import styled from "styled-components";
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1024px;
  margin: 0 15vw;
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
`;
const BoardLayout = ({ children }) => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};
export default BoardLayout;
