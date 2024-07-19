import { useEffect, useRef, useState } from "react";
import BoardLayout from "../../components/BoardLayout";
import AxiosApi from "../../api/AxiosApi";
import {
  Container,
  Top,
  ContentContainer,
  Button,
} from "../../style/WriteStyle";
import { HeadContainer } from "../../style/SelectBoardStyle";
import {
  Head,
  UpHead,
  UnderHead,
  Body,
  Footer,
  ReplyContainer,
  InputContainer,
  UpInert,
  ProfileImg,
} from "../../style/ProjectDetailStyle";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import defaultImage from "../../image/person-icon2.png";
import ReplyListComponent from "./ReplyListComponent";
import { formatDate, formatTimestamp } from "../../utils/formatDate";
const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 80%;
  padding: 16px;
  font-size: 2rem;
  height: 60px;
  font-weight: bold;
  @media screen and (max-width: 500px) {
    padding: 6px;
    height: 30px;
    font-size: 0.8rem;
  }
`;
const ProjectTime = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  /*width: 20%;
   height: 60px;
  padding: 12px;*/
  font-size: 12px;
  @media screen and (max-width: 500px) {
    font-size: 6px;
  }
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 60px;
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    height: auto;
  }
`;
const Recruit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  width: 50%;
  height: 60px;
  padding: 12px;
  @media screen and (max-width: 500px) {
    height: 30px;
  }
`;

const RecruitMemNum = styled.div`
  font-size: 12px;
  @media screen and (max-width: 500px) {
    font-size: 6px;
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const Skills = styled.div`
  display: flex;
  border: solid #b9b9b9;
  border-width: 0 0 1px;
  padding: 12px;
  & button {
    margin-left: 4px;

    @media screen and (max-width: 500px) {
      font-size: 6px;
    }
  }
`;

const ListBtt = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  & button {
    margin-left: 8px;

    @media screen and (max-width: 500px) {
      font-size: 6px;
    }
  }
`;

const Input = styled.textarea`
  width: 70%;
  height: auto;
  margin-left: 10px;
  resize: none;
  background-color: #fbfcfc;
  border: 0.5px solid #d0d3d7;
  border-radius: 6px;
  overflow: hidden;
  font-size: 1rem;
  z-index: 2;

  &:focus {
    border: 0.8px solid #000;
    outline: none; /* 추가: 기본 포커스 아웃라인 제거 */
  }
`;

const ConfirmReply = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;
const NickName = styled.div`
  padding: 8px;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Notice = styled.div``;
const Setting = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 14px;
  left: -85px;
  border-radius: 7px;
  padding: 10px;
  background-color: #ff5353;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
  padding: 12px;
`;
const ModifyBtt = styled.button`
  background-color: #ffffff;
  border-radius: 10px;
  border: none;
  padding: 5px;
  font-size: 14px;
`;
const ProjectDetail = () => {
  const { projectId } = useParams();
  const [projectContent, setProjectContent] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [replyContent, setReplyContent] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModify, setIsModify] = useState(true);
  const [currentCount, setCurrenCount] = useState();
  const [isRecruit, setIsRecruit] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const email = localStorage.getItem("email");
  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const id = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchUserInfo = async (email) => {
      try {
        const rsp = await AxiosApi.getUserInfo2(email);
        setUserInfo(rsp.data);

        if (rsp.data && rsp.data.profileImgPath) {
          setImageUrl(rsp.data.profileImgPath);
        } else {
          setImageUrl(defaultImage);
        }
      } catch (e) {
        console.log(e);
        setImageUrl(defaultImage);
      }
    };
    //console.log("userInfo", userInfo);
    fetchUserInfo(id);
  }, []);

  // 플젝 상세 정보 가져오기
  useEffect(() => {
    const projectDetail = async (id) => {
      // console.log(projectId, " 플젝 아이디 값 넘기기 ");
      try {
        const response = await AxiosApi.getProjectDetail(id);
        console.log("상세 보기 데이터 ", response.data);
        const formattedData = {
          ...response.data,
          regDate: formatDate(response.data.regDate),
          projectTime: formatDate(response.data.projectTime),
        };
        setProjectContent(formattedData);
        numberOfRecruit(formattedData.projectName);
        // setBoardList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e.response);
      }
    };
    projectDetail(projectId);
  }, [projectId]);
  const textareaRef = useRef(null);
  // 댓글창 자동으로 늘어나게하기...
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 따라 높이 조절
    }
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const handleModfiy = () => {
    navigate(`/apueda/modify/project/${projectId}`);
  };
  const handleDelete = () => {
    deleteProject(projectId);
  };
  const deleteProject = async (projectId) => {
    const rspWriter = await AxiosApi.getProjectDetail(projectId);
    console.log("dele 실행", rspWriter.data.memberId.email);
    if (email !== rspWriter.data.memberId.email) {
      alert("너..작성자가 아니구나?...");
    } else {
      const isDel = window.confirm("정말로 삭제 하시겠습니까?");
      if (isDel) {
        try {
          const response = await AxiosApi.projectDelete(projectId);
          if (response.data) {
            alert("프로젝트가 삭제되었습니다.");
            navigate("/apueda/board");
          } else {
            alert("삭제할 프로젝트 데이터가 없습니다.");
          }
        } catch (e) {
          console.log("삭제중 오류가 발생하였습니다.", e);
        }
      }
    }
  };
  const request = (pId) => {
    console.log("실행", pId);
    if (currentCount == projectContent.recruitNum) {
      alert("신청인원이 다 찼습니다.");
      return;
    }
    if (projectContent.memberId.email === email) {
      alert("작성자는 신청 할 수 없습니다.");
      return;
    }
    const postData = {
      projectId: { projectId: pId },
    };
    console.log("신청 중복 ", postData);
    requestProject(postData);
  };

  const requestProject = async (postData) => {
    const isRequest = await AxiosApi.searchAllRequest(projectId, email);
    console.log("isRequest 객체", isRequest);
    if (!isRequest.data) {
      alert("이미 신청한 프로젝트 입니다.");
      return;
    } else {
      console.log(isRequest.data, "isRequest.data[0]");
      try {
        const rsp = await AxiosApi.requestProject(postData);
        if (rsp.status === 200) {
          alert("신청 성공");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  // 현재 참여중인 인원 수 가지고 오기

  const numberOfRecruit = async (roomName) => {
    try {
      const rsp = await AxiosApi.findRoomByRoomName(roomName);
      setCurrenCount(rsp.data.currentCount);

      console.log("currentCount", rsp.data.currentCount);
    } catch (e) {
      console.log(e);
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
    <BoardLayout>
      <Container>
        <HeadContainer style={{ justifyContent: "center" }}>
          <Top>프로젝트</Top>
        </HeadContainer>
        <ContentContainer style={{ padding: "32px", height: "auto" }}>
          {projectContent && (
            <Head>
              <UpHead>
                <Title>{projectContent.projectTitle}</Title>
                <Recruit>
                  <Notice>모집 정보</Notice>
                  {!isRecruit ? (
                    <span>모집이 종료된 프로젝트 입니다.</span>
                  ) : (
                    <>
                      <ProjectTime>
                        {projectContent.projectTime}까지
                      </ProjectTime>
                      <RecruitMemNum>
                        {currentCount}/{projectContent.recruitNum}명
                      </RecruitMemNum>
                    </>
                  )}
                </Recruit>
              </UpHead>
              <UnderHead>
                <Profile>
                  <ProfileImg>
                    <img src={projectContent.profileImg}></img>
                  </ProfileImg>
                  <NickName>{projectContent.nickName}</NickName>
                </Profile>
                <Setting>
                  {email !== projectContent.memberId ? (
                    <div style={{ position: "relative" }}>
                      {projectContent.memberId.email === email ? (
                        <div onClick={toggleDropdown}>...</div>
                      ) : (
                        <divs></divs>
                      )}

                      {isDropdownOpen && (
                        <Dropdown ref={modalRef}>
                          <ModifyBtt
                            onClick={() => handleModfiy()}
                            value={isModify}
                          >
                            수정하기
                          </ModifyBtt>
                          <ModifyBtt
                            onClick={() => handleDelete()}
                            value={!isModify}
                          >
                            삭제하기
                          </ModifyBtt>
                        </Dropdown>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </Setting>
              </UnderHead>
            </Head>
          )}
          {projectContent && (
            <Body>
              <Content>{projectContent.projectContent}</Content>
            </Body>
          )}
          {projectContent && (
            <Footer>
              <Skills>
                {projectContent.skillName &&
                  projectContent.skillName.map((skills, index) => (
                    <Button
                      key={index}
                      style={{ width: "auto", padding: "0 10px" }}
                    >
                      {skills.skillName}
                    </Button>
                  ))}
              </Skills>
              <ListBtt>
                {projectContent.existStatus && (
                  <Button onClick={() => request(projectContent.projectId)}>
                    신청
                  </Button>
                )}

                <Button onClick={() => navigate("/apueda/board")}>목록</Button>
              </ListBtt>
            </Footer>
          )}
          <ReplyContainer>
            <ReplyListComponent
              Id={projectId}
              type="project"
              userInfo={userInfo}
              boardId={null}
              projectId={projectId}
            />
          </ReplyContainer>
        </ContentContainer>
      </Container>
    </BoardLayout>
  );
};
export default ProjectDetail;
