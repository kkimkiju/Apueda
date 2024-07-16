import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/UserStore";
// import useTokenAxios from "../../hooks/useTokenAxios";
import { formatDate, formatTimestamp } from "../../utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";
const Container = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
`;

const ContentNameList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  color: #ff5353;
  font-size: 0.9rem;
  list-style-type: none;
  border-bottom: 0.5px solid #c1c1c1;
`;

const Column = styled.div`
  margin: 0 16px;
  list-style-type: none;
  padding: 9px;
`;

const List = styled.div`
  width: 100%;
  list-style-type: none;
  padding: 0 18px 18px 18px;
`;

const ListResult = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.5px solid #c1c1c1;
  height: auto;
  padding: 8px 0;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;

  & img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
  }
  & span {
    display: flex;
    align-items: center;
    padding: 12px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
`;

const Etc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  width: 10%;
  position: relative;
  justify-content: center;
`;

export const Button = styled.button`
  border: 0;
  color: #ffffff;
  background-color: #ff5353;
  border-radius: 26px;
  margin-right: 12px;
  font-size: 12px;
  padding: 6px;
  height: auto;
  width: auto;
  overflow: hidden;
`;
const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  width: fit-content;
  cursor: pointer;
  :hover {
    color: red;
  }
`;
const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [sortBy, setSortBy] = useState(true); // Default sort by newest
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageSize, setTotalPageSize] = useState(0); // 총 페이지 수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getBoardList();
        console.log(" getBoardList실행", rsp.data);
        const sortedBoards = rsp.data.boards.sort(
          (a, b) => new Date(b.regDate) - new Date(a.regDate)
        );
        setTotalPageSize(rsp.data.totalPages);
        setBoardList((prevBoards) => [...prevBoards, ...sortedBoards]);
      } catch (e) {
        console.error("Error fetching project list:", e);
      }
    };
    fetchProjectList();
  }, [currentPage]);

  const sortByCreatedAt = () => {
    const sortedBoards = [...boardList].sort((a, b) => {
      if (sortBy) {
        return new Date(b.regDate) - new Date(a.regDate);
      } else {
        return new Date(a.regDate) - new Date(b.regDate);
      }
    });
    setBoardList(sortedBoards);
    setSortBy(!sortBy); // Toggle sort order
  };

  const boardClick = (boardId) => {
    console.log(boardId, "플젝id값");
    navigate(`/apueda/board/boardDetail/${boardId}`);
  };

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <Container>
      <ListContainer>
        <ContentNameList>
          <Column>작성자</Column>
          <Column>제목</Column>
          <Column>
            <Button onClick={sortByCreatedAt}>등록일자</Button>
          </Column>
        </ContentNameList>
        <List>
          <InfiniteScroll
            dataLength={boardList.length}
            next={fetchMoreData}
            hasMore={currentPage < totalPageSize}
            loader={<h4>Loading...</h4>}
            endMessage={<p>자유 게시글이 더 이상 없습니다.</p>}
            className="container"
          >
            {boardList &&
              boardList.map((board, index) => (
                <ListResult key={index}>
                  <Profile style={{ flexDirection: "row" }}>
                    <img src={board.profileImg} alt="board" />
                    <span> {board.nickName}</span>
                  </Profile>
                  <Content>
                    <StyledLink onClick={() => boardClick(board.boardId)}>
                      {board.title}
                    </StyledLink>
                  </Content>
                  <Etc>{formatTimestamp(board.regDate)}</Etc>
                </ListResult>
              ))}
          </InfiniteScroll>
        </List>
      </ListContainer>
    </Container>
  );
};

export default BoardList;
