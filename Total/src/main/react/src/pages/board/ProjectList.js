import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";
import noImg from "../../image/noImage.jpg";
import ProjectSearchBar from "./ProjectSearchBar";
import DropdownMenu from "./DropDownMenu";
import PaymentApi from "../../api/PaymentAxios";
const Container = styled.div`
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 0 0 30px 30px;
  // overflow-y: scroll;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

const ContentNameList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  color: #ff5353;
  padding: 0 10px;
  list-style-type: none;
  border-bottom: 0.5px solid #c1c1c1;
`;

const Column = styled.div`
  list-style-type: none;
  padding: 9px;
  @media screen and (max-width: 860px) {
    padding: 0;
  }
  @media screen and (max-width: 500px) {
    font-size: 9px;
  }
`;

const List = styled.div`
  width: 100%;
  list-style-type: none;

  background-color: #ff5353;
  /* position: relative; */
  & .none-sub {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    @media screen and (max-width: 860px) {
      display: flex;
      flex-direction: row;
      height: auto;
      width: 100%;
      justify-content: center;
    }
    @media screen and (max-width: 500px) {
    }
  }
`;

const ListResult = styled.div`
  display: flex;
  width: 29%;
  border-bottom: 4.5px solid #c1c1c1;
  border-right: 3px solid #c1c1c1;
  height: 30%;
  background-color: ${(props) =>
    props.isRecruitmentComplete ? "rgba(128, 128, 128, 0.7)" : "#fffbfc"};
  opacity: ${(props) => (props.isRecruitmentComplete ? 0.7 : 1)};
  justify-content: space-around;
  border-radius: 36px;
  padding: 23px;
  margin: 18px;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 1400px) {
    width: 43%;
    height: 510px;
    /* height: 520px; */
    justify-content: space-around;
  }
  @media screen and (max-width: 860px) {
    display: flex;
    width: 70%;
    height: auto;
    justify-content: center;
  }
  img {
    width: auto;
    height: 370px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    width: 90%;
    height: 400px;
    justify-content: center;
    img {
      height: 65%;
    }
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`;
const ProfileInList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -14px;
  z-index: ${(props) => props.zIndex};
  & img {
    background-color: #fff;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    object-fit: cover;
    border: 4px solid #fff;
  }
  & .moreProfile {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    background-color: #fa7373;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    border: 4px solid #fff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0;
  padding: 0 10px;
  & span {
    font-size: 1rem;
    overflow: hidden;
  }
`;

const Etc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  width: 10%;
  position: relative;
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
  @media screen and (max-width: 500px) {
    width: auto;
    margin: 0;
    font-size: 7px;
  }
`;
const Input = styled.input`
  width: 100%;
`;
const NoResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
  color: #fff;
  font-size: 2rem;
  @media screen and (max-width: 500px) {
    height: 500px;

    font-size: 1rem;
  }
`;

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [sortBy, setSortBy] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(0); // 총 페이지 수
  const [imgUrl, setImgUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isRecruitmentComplete, setIsRecruitmentComplete] = useState(true); // 모집 완료 상태
  const email = localStorage.getItem("email");
  const [isRecruit, setIsRecruit] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getProjectList(currentPage);
        // Sort project list by regDate in descending order (newest first)
        //const chatMemRsp = await AxiosApi.findRoomByRoomName(rsp.data.);
        const sortedProjects = rsp.data.projects.sort(
          (a, b) => new Date(b.regDate) - new Date(a.regDate)
        );
        setTotalPageSize(rsp.data.totalPages);
        setProjectList((prevProjects) => [...prevProjects, ...sortedProjects]);
        setIsRecruitmentComplete(sortedProjects.existStatus);
        numberOfRecruit(sortedProjects.projectName);
        setImgUrl(sortedProjects.imgPath);
      } catch (e) {
        console.error("Error fetching project list:", e);
      }
    };
    fetchProjectList();
  }, [currentPage]);

  // const sortByCreatedAt = () => {
  //   const sortedProjects = [...projectList].sort((a, b) => {
  //     if (sortBy) {
  //       return new Date(b.regDate) - new Date(a.regDate);
  //     } else {
  //       return new Date(a.regDate) - new Date(b.regDate);
  //     }
  //   });
  //   setProjectList(sortedProjects);
  //   setSortBy(!sortBy); // Toggle sort order
  // };
  const sortByCreatedAt = () => {
    let sortedProjects;
    if (!inputValue && !clickArray) {
      // projectList를 정렬합니다.
      sortedProjects = [...projectList].sort((a, b) => {
        if (sortBy) {
          return new Date(b.regDate) - new Date(a.regDate);
        } else {
          return new Date(a.regDate) - new Date(b.regDate);
        }
      });
      setProjectList(sortedProjects);
    } else {
      // projectAllList를 정렬합니다.
      sortedProjects = [...projectAllList].sort((a, b) => {
        if (sortBy) {
          return new Date(b.regDate) - new Date(a.regDate);
        } else {
          return new Date(a.regDate) - new Date(b.regDate);
        }
      });
      setProjectAllList(sortedProjects);
    }

    // 정렬 순서를 토글합니다.
    setSortBy(!sortBy);
  };
  // 플젝 상세보기 페이지 이동
  const projectClick = (projectId) => {
    navigate(`/apueda/board/projectDetail/${projectId}`);
  };
  // 무한스크롤 다음페이지 넘기기
  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  // 플젝 리스트 카드 hover 스타일
  const handleHover = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translate(-5px, -5px)";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  };
  // 플젝 리스트 카드 MouseDown 스타일
  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "none";
  };
  const fetchDeadline = async () => {
    try {
      let response = await PaymentApi.deadline(email);
      if (response && response.data) {
        setSubstatus(response.data[0].status);
      } else {
        console.error("No deadline data in response");
      }
    } catch (error) {
      setSubstatus("null");
      console.error("Error fetching deadline:", error);
    }
  };
  useEffect(() => {
    fetchDeadline();
  }, []);

  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };
  const [clickArray, setClickArray] = useState([]);
  //useCallback을 사용하여 부모 컴포넌트가 리렌더링되더라도 이 함수는 재생성되지 않도록 합니다.
  const handleSkillClick = useCallback((skills) => {
    setClickArray(skills);
  }, []);

  const [substatus, setSubstatus] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [projectAllList, setProjectAllList] = useState([]);
  const [currentCount, setCurrenCount] = useState();

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getProjectAllList();
        const sortedProjects = rsp.data.sort(
          (a, b) => new Date(b.regDate) - new Date(a.regDate)
        );
        setProjectAllList(sortedProjects);
        numberOfRecruit(sortedProjects.projectName);
      } catch (e) {
        console.error("Error fetching project list:", e);
      }
    };
    fetchProjectList();
  }, []);

  // 검색어 및 스킬 필터링 로직
  useEffect(() => {
    const filteredProjectList = projectAllList.filter((project) => {
      const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();
      const trimmedProjectTitle = project.projectTitle
        .replace(/\s+/g, "")
        .toLowerCase();

      // 클릭한 모든 스킬이 프로젝트의 skillName에 포함되는지 확인
      const hasSkill =
        clickArray.length === 0 ||
        clickArray.every((skill) =>
          project.skillName.some((s) => s.skillName.includes(skill))
        );

      // 프로젝트 제목에 검색어가 포함되는지 확인
      const hasSearchTerm = trimmedProjectTitle.includes(trimmedInputValue);

      return hasSkill && hasSearchTerm;
    });

    setFilteredResults(filteredProjectList);
  }, [inputValue, clickArray, projectAllList]);

  // filteredResults 상태 변경될 때마다 로그 출력
  useEffect(() => {}, [filteredResults]);

  const numberOfRecruit = async (roomName) => {
    try {
      const rsp = await AxiosApi.findRoomByRoomName(roomName);
      setCurrenCount(rsp.data.currentCount);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    if (currentCount === 0) {
      setIsRecruit(false);
    } else {
      setIsRecruit(true);
    }
  }, [currentCount]);
  return (
    <Container>
      <ListContainer>
        {isSearchModal && <ProjectSearchBar isOpen={isSearchModal} />}
        <ContentNameList>
          {substatus === "만료" || substatus === null ? (
            <Button> 스킬필터 </Button>
          ) : (
            <DropdownMenu onSkillClick={handleSkillClick}>
              <Column> 스킬필터 </Column>
            </DropdownMenu>
          )}
          {/* <Column onClick={OpenSearchModal}>
            스킬필터
            {isSearchModal && <ProjectSearchBar isOpen={isSearchModal} />}
          </Column> */}
          {substatus === "만료" || substatus === null ? (
            <Column>
              구독하면 7개 이상의 결과물과 검색 기능을 사용할 수 있습니다.
            </Column>
          ) : (
            <Column style={{ width: "30%" }}>
              <Input
                placeholder="제목 검색"
                value={inputValue}
                onChange={handleSearch}
              />
            </Column>
          )}
          {/* <Column>제목</Column> */}
          <Column>
            <Button onClick={sortByCreatedAt}>등록일자</Button>
          </Column>
        </ContentNameList>
        <List>
          {substatus === "만료" || substatus === null ? (
            <div style={{}} className="none-sub">
              {projectList.map((project, index) => (
                <ListResult
                  key={index}
                  onMouseOver={(e) => handleHover(e)}
                  onMouseLeave={(e) => handleMouseDown(e)}
                  className="card"
                >
                  {project.imgPath ? (
                    <img
                      src={project.imgPath}
                      alt="No Image"
                      onClick={() => projectClick(project.projectId)}
                    ></img>
                  ) : (
                    <img
                      src={noImg}
                      alt="profile"
                      onClick={() => projectClick(project.projectId)}
                    />
                  )}
                  <Content>
                    <span>{project.projectTitle}</span>
                    {isRecruit === false ? (
                      <span>모집 종료</span>
                    ) : (
                      <> {formatTimestamp(project.regDate)}</>
                    )}
                  </Content>
                  <ProfileContainer>
                    <span>
                      {project.skillName &&
                        project.skillName.map((skills, index) => (
                          <Button
                            key={index}
                            style={{
                              borderRight: "1px solid #c1c1c1",
                              borderBottom: "2px solid #c1c1c1",
                            }}
                          >
                            {skills.skillName}
                          </Button>
                        ))}
                    </span>
                    <ProfileInList>
                      <img src={project.profileImg} alt="profile" />
                    </ProfileInList>
                  </ProfileContainer>
                  <Etc></Etc>
                </ListResult>
              ))}
            </div>
          ) : (
            <>
              {!inputValue && !clickArray ? (
                <InfiniteScroll
                  dataLength={projectList.length}
                  next={fetchMoreData}
                  hasMore={currentPage < totalPageSize}
                  className="container"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {projectList.map((project, index) => (
                    <ListResult
                      key={index}
                      onMouseOver={(e) => handleHover(e)}
                      onMouseLeave={(e) => handleMouseDown(e)}
                      className="card"
                    >
                      {project.imgPath ? (
                        <img
                          src={project.imgPath}
                          alt="No Image"
                          onClick={() => projectClick(project.projectId)}
                        ></img>
                      ) : (
                        <img
                          src={noImg}
                          alt="profile"
                          onClick={() => projectClick(project.projectId)}
                        />
                      )}
                      <Content>
                        <span>{project.projectTitle}</span>
                        {isRecruit === false ? (
                          <span>모집 종료</span>
                        ) : (
                          <> {formatTimestamp(project.regDate)}</>
                        )}
                      </Content>
                      <ProfileContainer>
                        <span>
                          {project.skillName &&
                            project.skillName.map((skills, index) => (
                              <Button
                                key={index}
                                style={{
                                  borderRight: "1px solid #c1c1c1",
                                  borderBottom: "2px solid #c1c1c1",
                                }}
                              >
                                {skills.skillName}
                              </Button>
                            ))}
                        </span>
                        <ProfileInList>
                          <img src={project.profileImg} alt="profile" />
                        </ProfileInList>
                      </ProfileContainer>
                      <Etc></Etc>
                    </ListResult>
                  ))}
                </InfiniteScroll>
              ) : (
                <InfiniteScroll
                  dataLength={projectList.length}
                  next={fetchMoreData}
                  hasMore={currentPage < totalPageSize}
                  className="container"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {filteredResults.length !== 0 ? (
                    filteredResults.map((project, index) => (
                      <ListResult
                        key={index}
                        onMouseOver={(e) => handleHover(e)}
                        onMouseLeave={(e) => handleMouseDown(e)}
                        className="card"
                      >
                        {project.imgPath ? (
                          <img
                            src={project.imgPath}
                            alt="No Image"
                            onClick={() => projectClick(project.projectId)}
                          ></img>
                        ) : (
                          <img
                            src={noImg}
                            alt="profile"
                            onClick={() => projectClick(project.projectId)}
                          />
                        )}
                        <Content>
                          <span>{project.projectTitle}</span>
                          {isRecruit === false ? (
                            <span>모집 종료</span>
                          ) : (
                            <> {formatTimestamp(project.regDate)}</>
                          )}
                        </Content>
                        <ProfileContainer>
                          <span>
                            {project.skillName &&
                              project.skillName.map((skills, index) => (
                                <Button
                                  key={index}
                                  style={{
                                    borderRight: "1px solid #c1c1c1",
                                    borderBottom: "2px solid #c1c1c1",
                                  }}
                                >
                                  {skills.skillName}
                                </Button>
                              ))}
                          </span>
                          <ProfileInList>
                            <img src={project.profileImg} alt="profile" />
                          </ProfileInList>
                        </ProfileContainer>
                        <Etc></Etc>
                      </ListResult>
                    ))
                  ) : (
                    <NoResult>검색 결과가 없습니다.</NoResult>
                  )}
                </InfiniteScroll>
              )}
            </>
          )}
        </List>
      </ListContainer>
    </Container>
  );
};

export default ProjectList;