import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatTimestamp } from "../utils/formatDate";
import noImg from "../image/noImage.jpg";
import { useEffect, useState } from "react";
import AxiosApi from "../api/AxiosApi";
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
const ListResult = styled.div`
  display: flex;
  width: 46%;
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
    width: 44%;
    height: 510px;
    /* height: 520px; */
    justify-content: space-around;
    img {
      width: auto;
      height: 370px;
    }
  }
  @media screen and (max-width: 1400px) {
    width: 44%;
    height: 510px;
    /* height: 520px; */
    justify-content: space-around;
    img {
      width: auto;
      height: 370px;
    }
  }
  @media screen and (max-width: 860px) {
    display: flex;
    width: 90%;
    height: auto;
    justify-content: center;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    width: 90%;
    /* height: 400px; */
    justify-content: center;
    img {
      width: auto;
      height: auto;
    }
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
  @media screen and (max-width: 500px) {
    width: auto;
    margin: 0;
    font-size: 7px;
  }
`;
const SearchList = ({ inputValue, skillArray }) => {
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [isRecruitmentComplete, setIsRecruitmentComplete] = useState(true); // 모집 완료 상태
  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const rsp = await AxiosApi.getProjectAllList();
        console.log("sortedProjects", rsp.data);
        setProjectList(rsp.data);
        setIsRecruitmentComplete(rsp.data.existStatus);
        setImgUrl(rsp.data.imgPath);
        console.log(projectList, "imgPath");
      } catch (e) {
        console.error("Error fetching project list:", e);
      }
    };
    fetchProjectList();
  }, [inputValue, skillArray]);
  useEffect(() => {
    console.log("SearchList skillArray", skillArray);
    const results = projectList.filter((project) => {
      const projectTitleMatch =
        !inputValue ||
        project.projectTitle
          .toLowerCase()
          .includes(inputValue.toLowerCase().trim());

      const skillMatch =
        !skillArray.length ||
        skillArray.some((skill) =>
          Array.isArray(project.skillName)
            ? project.skillName.some((skillObj) =>
                skillObj.skillName
                  .toLowerCase()
                  .includes(skill.toLowerCase().trim())
              )
            : project.skillName.skillName
                .toLowerCase()
                .includes(skill.toLowerCase().trim())
        );

      return projectTitleMatch && skillMatch;
    });

    setFilteredResults(results);
  }, [inputValue, skillArray, projectList]);

  const projectClick = (projectId) => {
    console.log(projectId, "플젝id값");
    navigate(`/apueda/board/projectDetail/${projectId}`);
  };
  const handleHover = (e) => {
    e.stopPropagation();
    e.currentTarget.style.transform = "translate(-5px, -5px)";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  };
  const handleMouseDown = (e) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.transition = "transform 0.5s ease";
    e.currentTarget.style.boxShadow = "none";
  };
  return (
    <>
      {filteredResults.length === 0 ? (
        <p>결과가 없습니다.</p>
      ) : (
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
              />
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
                <img
                  src={project.profileImg}
                  alt="profile"
                  style={{ width: "50px", height: "50px" }}
                />
              </ProfileInList>
            </ProfileContainer>
            <Etc></Etc>
          </ListResult>
        ))
      )}
    </>
  );
};
export default SearchList;
