import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  background-color: white;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;

  @media (max-width: 700px) {
    font-size: 30px;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#ff5353" : "gray")};
  color: white;
  border: 1px solid black;
  padding: 6px;
  font-size: 20px;
  cursor: pointer;
  width: 25vw;
  &:hover {
    background-color: black;
  }
  @media (max-width: 700px) {
    width: 40vw;
  }
`;
const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 내부 요소들을 양쪽에 배치 */
  align-items: center; /* 수직으로 가운데 정렬 */
  width: 500px;
  padding: 20px;
  background-color: white;
  border: 3px solid #ff5353;
  border-radius: 30px;

  margin-top: 30px;
  margin-bottom: 20px;
  h1 {
    font-size: 20px;
    margin-right: 50px;
    @media (max-width: 700px) {
      font-size: 20px;
    }
    @media (max-width: 500px) {
      font-size: 15px;
    }
  }

  @media (max-width: 900px) {
    width: 80vw;
  }
  @media (max-width: 500px) {
    width: 85vw;
  }
`;

const DelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  background-color: #ff5353;
  text-decoration: none;

  color: white;
  border: none;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const Mywrite = () => {
  const [showProject, setShowProject] = useState(true);
  const [showFree, setShowFree] = useState(false);
  const [boardList, setBoardList] = useState(null);
  const [projectList, setProjectList] = useState(null);

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getMyProjectList();
//        console.log(rsp.data);
//        console.log(localStorage.getItem("email"));
        setProjectList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fetchProjectList();
  }, []);

  useEffect(() => {
    const fetchBoardList = async () => {
      try {
        const rsp = await AxiosApi.getMyBoardList();
//        console.log(rsp.data);
//        console.log(localStorage.getItem("email"));
        setBoardList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };

    fetchBoardList();
  }, []);

  return (
    <>
      <Container>
        <Title>내가 쓴 글</Title>
        <ButtonContainer>
          <Button
            primary={showProject ? true : false}
            onClick={() => {
              setShowProject(true);
              setShowFree(false);
            }}
          >
            프로젝트
          </Button>

          <Button
            primary={showFree ? true : false}
            onClick={() => {
              setShowProject(false);
              setShowFree(true);
            }}
          >
            자유게시판
          </Button>
        </ButtonContainer>

        {showProject && (
          <>
            {projectList && (
              <div>
                {projectList.map((project, index) => (
                  <div key={index}>
                    <ListWrapper>
                      <h1>제목 : {project.projectTitle}</h1>

                      <DelButton
                        as={Link}
                        to={`/apueda/board/projectDetail/${project.projectId}`}
                      >
                        이동
                      </DelButton>
                    </ListWrapper>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {showFree && (
          <>
            {boardList && (
              <div>
                {boardList.map((board, index) => (
                  <div key={index}>
                    <ListWrapper>
                      <h1>제목 : {board.title}</h1>

                      <DelButton
                        as={Link}
                        to={`/apueda/board/boardDetail/${board.boardId}`}
                      >
                        이동
                      </DelButton>
                    </ListWrapper>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <Link to="/apueda/mypage">
          <Exit src={exit} />
        </Link>
      </Container>
    </>
  );
};

export default Mywrite;
