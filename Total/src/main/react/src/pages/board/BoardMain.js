import styled from "styled-components";
import BoardList from "./BoardList";
import HeadBar from "./HeadBar";
import ProjectList from "./ProjectList";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";

const BoardLayout = styled.div`
  width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin: 0 10vw;
  @media screen and (min-width: 2040px) {
    margin: 0 10vw;
    width: 1440px;
  }
  @media screen and (max-width: 1440px) {
    margin: 0 5vw;
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
  @media screen and (max-width: 400px) {
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
const BoardMain = () => {
  const [isClick, setIsClick] = useState({ a: true, b: false });
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const { loginStatus } = context;

  // 로그인 안 할시에 로그인 창으로 이동
  useEffect(() => {
    if (!loginStatus) {
      navigate("/apueda/login");
    }
  }, []);

  return (
    <BoardLayout>
      <Container>
        <HeadBar setIsClick={setIsClick} />
        {isClick.a ? <ProjectList /> : <BoardList />}
      </Container>
    </BoardLayout>
  );
};

export default BoardMain;
