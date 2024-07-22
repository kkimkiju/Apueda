import styled, { keyframes } from "styled-components";
import exit from "../../image/exit.png";
import { Container, ContainerBack, Exit } from "../../style/ModalStyle.js";
import AxiosApi from "../../api/AxiosApi.js";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../style/WriteStyle.js";

const Input = styled.input``;
const SearchResult = styled.div``;

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90%;

  @media screen and (max-width: 500px) {
    height: 60%;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 500px) {
    height: 60%;
    display: flex;
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 90%;
  border: 1px solid black;
  padding: 16px;
  margin: 32px;
  & input {
    height: 50px;
  }
  @media screen and (max-width: 768px) {
    padding: 8px;
    margin: 18px;
    & input {
      height: 30px;
    }
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    margin: 0;
    height: auto;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  height: 90%;
  padding: 16px;
  margin: 32px;
  border: 1px solid black;
  flex-direction: row;
  display: block;
  @media screen and (max-width: 768px) {
    padding: 8px;
    margin: 18px;

    overflow: scroll;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    margin: 10px 0;
  }
`;

const Ul = styled.ul`
  display: ${(props) => (props.showList ? "inline-block" : "none")};
  list-style: none;
  overflow: scroll;
`;

const SkillList = styled.div`
  cursor: pointer;
`;
const Save = styled.div`
  cursor: pointer;
  margin-top: 16px;
`;

const SkillModal = ({ closeSkillModal, onSave, modifySkills }) => {
  const [inputValue, setInputValue] = useState("");
  const [skillsArray, setSkillsArray] = useState([]);
  const [clickList, setClickList] = useState([]);
  const modalRef = useRef(null);

  /**
   * @param {event} event input창에 입력한값을 상태관리하는 handler
   */
  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  // 스킬 리스트 가져오기
  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await AxiosApi.getSkilList();
        setSkillsArray(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    getSkills();
  }, []);

  // 수정모드시 내가 저장했던 스킬 불러오기
  useEffect(() => {
    setClickList(modifySkills);
  }, [modifySkills]);

  // 입력한 스킬 값과 db스킬 비교
  const filterSkillResult = skillsArray.filter((skill) => {
    const trimmedInputValue = inputValue.replace(/\s+/g, "").toLowerCase();
    const trimmedSkillName = skill.skillName.replace(/\s+/g, "").toLowerCase();
    return trimmedSkillName.includes(trimmedInputValue);
  });

  // 스킬 클릭시 setClickList에 저장
  const onClick = (skill) => {
    // 스킬 클릭한 리스트 중복 체크
    setClickList((prevList) => {
      if (prevList.some((item) => item.skillName === skill.skillName)) {
        return prevList;
      }
      const newList = [...prevList, skill];
      return newList;
    });
  };

  // 저장 버튼 클릭 시 선택된 스킬 리스트를 상위 컴포넌트로 전달
  const handleSave = () => {
    onSave(clickList);
    closeSkillModal();
  };

  const onRemove = (skill) => {
    setClickList((prevList) => {
      const newList = prevList.filter(
        (item) => item.skillName !== skill.skillName
      );
      return newList;
    });
  };

  // 모달 외 다른 곳 클릭 시 모달 닫기
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeSkillModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <ContainerBack>
      <Container ref={modalRef}>
        <Layout>
          <SearchContainer>
            <Input
              type="text"
              placeholder="스킬 이름"
              value={inputValue}
              onChange={handleSearchChange}
            />
            <Ul showList={inputValue !== ""}>
              {filterSkillResult.length > 0 ? (
                filterSkillResult.map((skill, index) => (
                  <li key={index}>
                    <SearchResult>
                      <SkillList
                        onClick={() => onClick(skill)}
                        value={skill.skillName}
                      >
                        {skill.skillName}
                      </SkillList>
                    </SearchResult>
                  </li>
                ))
              ) : (
                <></>
              )}
            </Ul>
          </SearchContainer>
          <ResultContainer>
            {clickList.map((skill, index) => (
              <Button
                key={index}
                onClick={() => onRemove(skill)}
                style={{
                  width: "auto",
                  height: "24px",
                  margin: "4px",
                }}
                value={modifySkills}
              >
                {skill.skillName}
              </Button>
            ))}
          </ResultContainer>
        </Layout>
        <Save onClick={handleSave}>
          <Button
            style={{
              height: "24px",
            }}
          >
            저장
          </Button>
        </Save>
      </Container>
    </ContainerBack>
  );
};

export default SkillModal;
