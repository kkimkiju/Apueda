import { Link } from "react-router-dom";
import styled from "styled-components";
import exit from "../image/exit.png";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  margin-bottom: 200px;
`;

const Exit = styled.img`
  width: 70px;
  height: 70px;
  margin-top: 25px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease-in;
  }
`;

const ExitWrap = styled.div``;

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
  background-color: ${(props) =>
    props.primary === "true" ? "#ff5353" : "gray"};
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

const ProfileImage = styled.div`
  img {
    vertical-align: -20px;
    width: 65px;
    height: 60px;
    border-radius: 100px;
    margin-right: 10px;
  }
  @media (max-width: 500px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  width: 75vw;
  border-radius: 30px;
  border: 3px solid #ff5353;
  flex-direction: column;
  margin-bottom: 40px;
  @media (max-width: 1300px) {
    width: 80vw;
    height: auto;
  }
`;

const ProjectTitle = styled.div`
  display: flex;
  justify-content: left;
  padding-left: 20px;
  h1 {
    @media (max-width: 1300px) {
      font-size: 25px;
    }
  }
`;

const ProjectItem = styled.div`
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  @media (max-width: 1300px) {
    flex-direction: column;
    justify-items: left;
    align-items: flex-start;
  }
`;

const Skill = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: 10px;
  background-color: #ff5353;
  border-radius: 30px;
  min-width: 50px;
  padding-top: 3px;
  color: white;

  @media (max-width: 500px) {
    margin-left: 0px;
  }
`;

const SkillBox = styled.div`
  font-size: 13px;
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;

const BtnBox = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
`;

const GoEndBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Gobutton = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  font-size: 20px;
  cursor: pointer;
  border: 3px solid #ff5353;
  border-radius: 30px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #ff5353;
    color: white;
  }
`;

const Endbutton = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  font-size: 20px;
  margin-left: 30px;
  cursor: pointer;
  border: 3px solid #ff5353;
  border-radius: 30px;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #ff5353;
    color: white;
  }
`;

const ReqContainer = styled.div`
  display: flex;
  width: 70vw;
  border: 3px solid #ff5353;
  border-radius: 20px;
  min-height: 10vw;
  flex-direction: column;
  margin-bottom: 20px;

  @media (max-width: 500px) {
    width: 80vw;
  }
`;

const ImgNickNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 10px;
  white-space: nowrap;

  h2 {
    font-size: 25px;
    @media (max-width: 500px) {
      font-size: 20px;
    }
  }
`;

const SkillContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 10px;
`;

const ReqBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  gap: 20px;
  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    margin-left: auto;
  }
`;

const ButtonStyle = styled.button`
  min-width: 5vw;
  height: 30px;
  color: white;
  background-color: #ff5353;
  border: none;
  border-radius: 30px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 60px;
    height: 25px;
  }
`;

const ImgNickSkill = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const AcceptBtn = styled.div``;
const RejectBtn = styled.div``;

const Mypj = () => {
  const [showProject, setShowProject] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [projectReq, setProjectReq] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [hostStatus, setHostStatus] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        if (rsp.data && rsp.data.email) {
          setUserInfo(rsp.data.email);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserInfo();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProject = async () => {
      try {
        const rsp = await AxiosApi.myProjectList();
        console.log(rsp.data);
        setProjectList(rsp.data);
        // 초기 호스트 상태 설정
        const initialHostStatus = rsp.data.map((project) =>
          project.chatManages.some(
            (manage) => manage.host && manage.member.email === userInfo
          )
        );
        setHostStatus(initialHostStatus);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fetchMyProject();
  }, [userInfo]);

  useEffect(() => {
    const fetchProjectApply = async () => {
      try {
        const rsp = await AxiosApi.myProjectApplyList();
        console.log(rsp.data);
        setProjectReq(rsp.data);
      } catch (error) {
        console.error("에러", error);
      }
    };
    fetchProjectApply();
  }, []);

  const handleJoinRoom = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleKickOut = async (roomid, email, projectId, nickname) => {
    const isConfirmed = window.confirm(`${nickname}님 Exit`);
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectKickOut(roomid, email, projectId);
        const updatedProject = projectList.map((project) => {
          if (project.chatManages[0]?.chatRoom.roomId === roomid) {
            return {
              ...project,
              chatManages: project.chatManages.filter(
                (manage) => manage.member.email !== email
              ),
            };
          }
          return project;
        });
        setProjectList(updatedProject);
        window.alert("Exit Successful.");
      } catch (error) {
        console.error("오류 : ", error);
      }
    }
  };

  const handleMemberExit = async (roomid, email, projectId, nickname) => {
    const isConfirmed = window.confirm(
      `${nickname}님 정말 프로젝트를 나가시겠습니까?`
    );
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectKickOut(roomid, email, projectId);
        window.alert("Exit Successful.");
        window.location.reload();
      } catch (error) {
        console.error("오류 : ", error);
      }
    }
  };

  const exitProject = async (roomid, email) => {
    const isConfirmed = window.confirm(
      `프로젝트를 삭제하시겠습니까? 
(삭제해도 채팅방&게시물은 남게 됩니다.)`
    );
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectExit(roomid, email);
        const updatedProject = projectList.filter(
          (project) =>
            !(
              project.chatManages[0]?.chatRoom.roomId &&
              project.chatManages[0]?.member.email === email &&
              project.chatManages[0]?.chatRoom.roomId === roomid
            )
        );
        setProjectList(updatedProject);
        window.alert("삭제 완료.");
      } catch (error) {
        console.error("오류 : ", error);
      }
    }
  };

  const requestAccept = async (applyid) => {
    const isConfirmed = window.confirm("수락하시겠습니까?");
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectRequestAccept(applyid);
        window.alert("수락 완료");
        window.location.reload();
      } catch (error) {
        console.error("오류 : ", error);
        console.log(applyid);
      }
    }
  };

  const requestReject = async (applyid) => {
    const isConfirmed = window.confirm("거절하시겠습니까?");
    if (isConfirmed) {
      try {
        await AxiosApi.ProjectRequestReject(applyid);
        window.alert("거절 완료");
        window.location.reload();
      } catch (error) {
        console.error("오류 : ", error);
        console.log(applyid);
      }
    }
  };

  return (
    <Container>
      <Title>나의 프로젝트</Title>
      <ButtonContainer>
        <Button
          primary={showProject ? "true" : "false"}
          onClick={() => {
            setShowProject(true);
            setShowApp(false);
          }}
        >
          프로젝트
        </Button>
        <Button
          primary={showApp ? "true" : "false"}
          onClick={() => {
            setShowProject(false);
            setShowApp(true);
          }}
        >
          요청
        </Button>
      </ButtonContainer>

      {showProject && (
        <div>
          {projectList.map((project, projectIndex) => (
            <ProjectContainer key={projectIndex}>
              <ProjectTitle>
                <h1>{project.chatManages[0]?.chatRoom?.roomName}</h1>
              </ProjectTitle>
              <ProjectItem>
                {project.chatManages.map((manage, manageIndex) => (
                  <Item key={manageIndex}>
                    <ImgNickNameBox>
                      <ProfileImage>
                        <img src={manage.member.profileImgPath} alt="이미지x" />
                      </ProfileImage>
                      <h2>
                        {manage.member.nickname}
                        {manage.host && (
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            (리더)
                          </span>
                        )}
                      </h2>
                    </ImgNickNameBox>
                    <SkillContainer>
                      {" "}
                      <Skill>Skill</Skill>{" "}
                      <SkillBox>{manage.member.skill}</SkillBox>
                    </SkillContainer>
                    {hostStatus[projectIndex] && !manage.host && (
                      <BtnBox>
                        <ButtonStyle
                          onClick={() =>
                            handleKickOut(
                              manage.chatRoom.roomId,
                              manage.member.email,
                              manage.projectId,
                              manage.member.nickname
                            )
                          }
                        >
                          강퇴
                        </ButtonStyle>
                      </BtnBox>
                    )}
                    {!manage.host && userInfo === manage.member.email && (
                      <BtnBox>
                        <ButtonStyle
                          onClick={() =>
                            handleMemberExit(
                              manage.chatRoom.roomId,
                              manage.member.email,
                              manage.projectId,
                              manage.member.nickname
                            )
                          }
                        >
                          나가기
                        </ButtonStyle>
                      </BtnBox>
                    )}
                  </Item>
                ))}
                <GoEndBtn>
                  <Gobutton
                    onClick={() =>
                      handleJoinRoom(project.chatManages[0]?.chatRoom?.roomId)
                    }
                  >
                    입장
                  </Gobutton>
                  {/* 방장 나가기 */}
                  {hostStatus[projectIndex] && (
                    <Endbutton
                      onClick={() =>
                        exitProject(
                          project.chatManages[0]?.chatRoom.roomId,
                          project.chatManages[0]?.member.email
                        )
                      }
                    >
                      프로젝트 삭제
                    </Endbutton>
                  )}
                </GoEndBtn>
              </ProjectItem>
            </ProjectContainer>
          ))}
        </div>
      )}

      {showApp && (
        <div>
          {projectReq.map((apply, index) => (
            <ReqContainer key={index}>
              <ProjectTitle>
                <h1>{apply.projectName}</h1>
              </ProjectTitle>
              <ProjectItem>
                <ImgNickSkill>
                  <ImgNickNameBox>
                    <ProfileImage>
                      <img src={apply.applicant.profileImgPath} alt="이미지x" />
                    </ProfileImage>
                    <h2>{apply.applicant.nickname}</h2>
                  </ImgNickNameBox>
                  <SkillContainer>
                    <Skill>Skill</Skill>
                    <SkillBox> {apply.applicant.skill}</SkillBox>
                  </SkillContainer>
                </ImgNickSkill>
                <ReqBtn>
                  <ButtonStyle>
                    <AcceptBtn onClick={() => requestAccept(apply.applyId)}>
                      수락
                    </AcceptBtn>
                  </ButtonStyle>
                  <ButtonStyle>
                    <RejectBtn onClick={() => requestReject(apply.applyId)}>
                      거절
                    </RejectBtn>
                  </ButtonStyle>
                </ReqBtn>
              </ProjectItem>
            </ReqContainer>
          ))}
        </div>
      )}

      <ExitWrap>
        <Link to="/apueda/mypage">
          <Exit src={exit} />
        </Link>
      </ExitWrap>
    </Container>
  );
};

export default Mypj;
