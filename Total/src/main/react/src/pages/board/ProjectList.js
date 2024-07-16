import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { formatTimestamp } from "../../utils/formatDate";
import InfiniteScroll from "react-infinite-scroll-component";
import noImg from "../../image/noImage.jpg";
import ProjectSearchBar from "./ProjectSearchBar";
import SearchList from "../../utils/searchList";
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
`;

const ContentNameList = styled.div`
  display: flex;
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
  padding: 18px;
  background-color: #ff5353;
  /* position: relative; */
`;

const ListResult = styled.div`
  display: flex;
  width: 46%;
  border-bottom: 4.5px solid #c1c1c1;
  border-right: 3px solid #c1c1c1;
  height: 30%;
  background-color: ${(props) =>
    props.isRecruitmentComplete ? "rgba(128, 128, 128, 0.7)" : "#fffbfc"};
  opacity: ${(props) => (props.isRecruitmentComplete ? 0.7 : 1)};
  justify-content: space-between;
  border-radius: 36px;
  padding: 23px;
  margin: 18px;
  flex-direction: column;
  position: relative;
  @media screen and (max-width: 1400px) {
    /* width: 45%; */
  }
  img {
    width: auto;
    height: 370px;
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
`;
const Input = styled.input`
  width: 100%;
`;

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  const [sortBy, setSortBy] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(0); // 총 페이지 수
  const [imgUrl, setImgUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isRecruitmentComplete, setIsRecruitmentComplete] = useState(true); // 모집 완료 상태
  const email = localStorage.getItem("email");
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
        console.log("sortedProjects", sortedProjects);
        setTotalPageSize(rsp.data.totalPages);
        setProjectList((prevProjects) => [...prevProjects, ...sortedProjects]);
        setIsRecruitmentComplete(sortedProjects.existStatus);
        console.log(isRecruitmentComplete, "isRecruitmentComplete");
        setImgUrl(sortedProjects.imgPath);
        console.log(projectList, "imgPath");
      } catch (e) {
        console.error("Error fetching project list:", e);
      }
    };
    fetchProjectList();
  }, [currentPage]);

  const sortByCreatedAt = () => {
    const sortedProjects = [...projectList].sort((a, b) => {
      if (sortBy) {
        return new Date(b.regDate) - new Date(a.regDate);
      } else {
        return new Date(a.regDate) - new Date(b.regDate);
      }
    });
    setProjectList(sortedProjects);
    setSortBy(!sortBy); // Toggle sort order
  };
  // 플젝 상세보기 페이지 이동
  const projectClick = (projectId) => {
    console.log(projectId, "플젝id값");
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
    //console.log("!");
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "none";
  };
  const fetchDeadline = async () => {
    try {
      let response = await PaymentApi.deadline(email);
      console.log("fetchDeadline", response.data);
      if (response && response.data) {
        setSubstatus(response.data[0].status);
      } else {
        console.error("No deadline data in response");
      }
    } catch (error) {
      setSubstatus("null");
      console.log("구독상태", substatus);
      console.error("Error fetching deadline:", error);
    }
  };
  useEffect(() => {
    fetchDeadline();
    console.log("상태 확인", substatus);
  }, []);

  const handleSearch = (event) => {
    setInputValue(event.target.value);
  };
  const [clickArray, setClickArray] = useState([]);
  useEffect(() => {
    console.log("clickArray 실행 : ", clickArray);
  }, [clickArray]);

  const handleSkillClick = (skill) => {
    setClickArray((prevArray) => {
      console.log("handleSkillClick 실행 : ", clickArray);
      if (prevArray.includes(skill)) {
        return prevArray.filter((item) => item !== skill);
      } else {
        console.log();
        return skill;
      }
    });
  };

  const [substatus, setSubstatus] = useState("");

  return (
    <Container>
      <ListContainer>
        {isSearchModal && <ProjectSearchBar isOpen={isSearchModal} />}
        <ContentNameList>
          <DropdownMenu onSkillClick={handleSkillClick}>
            <Column> 스킬필터 </Column>
          </DropdownMenu>

          {/* <Column onClick={OpenSearchModal}>
            스킬필터
            {isSearchModal && <ProjectSearchBar isOpen={isSearchModal} />}
          </Column> */}
          <Column style={{ width: "30%" }}>
            <Input placeholder="제목 검색" onChange={handleSearch} />
          </Column>
          {/* <Column>제목</Column> */}
          <Column>
            <Button onClick={sortByCreatedAt}>등록일자</Button>
          </Column>
        </ContentNameList>
        <List>
          {/* {substatus === "만료" || substatus === null ? ( */}
          {substatus ? (
            <>
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
                    {formatTimestamp(project.regDate)}
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
            </>
          ) : (
            <>
              {!inputValue ? (
                <InfiniteScroll
                  dataLength={projectList.length}
                  next={fetchMoreData}
                  hasMore={currentPage < totalPageSize}
                  className="container"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
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
                        {formatTimestamp(project.regDate)}
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
                    justifyContent: "space-between",
                  }}
                >
                  <SearchList inputValue={inputValue} skillArray={clickArray} />
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
