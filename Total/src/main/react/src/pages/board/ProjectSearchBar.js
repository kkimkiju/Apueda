import styled from "styled-components";

const ContainerBack = styled.div`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  height: 30vw;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid #ff5353;
  border-radius: 100px;
  z-index: 1000;

  @media (max-width: 500px) {
    width: 80vw;
    height: 500px;
  }
`;
const ProjectSearchBar = (isOpen) => {
  return (
    <ContainerBack>
      <Container></Container>
    </ContainerBack>
  );
};
export default ProjectSearchBar;
