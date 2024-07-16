import styled from "styled-components";
import SelectBoard from "./SelectBoard";
import BoardList from "./BoardList";
import HeadBar from "./HeadBar";
import ProjectList from "./ProjectList";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";

const BoardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 15vw;
  @media screen and (max-width: 1400px) {
    margin: 0 10vw;
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
`;
const BoardMain = () => {
  const [isClick, setIsClick] = useState({ a: true, b: false });

  // 로그인 안 할시에 로그인 창으로 이동
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, []);

  return (
    <BoardLayout>
      <Container>
        {/* Use the combined HeadBar component */}
        <HeadBar setIsClick={setIsClick} />
        {/* Render ProjectList or BoardList based on isClick state */}
        {isClick.a ? <ProjectList /> : <BoardList />}
      </Container>
    </BoardLayout>
  );
};

export default BoardMain;
