import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosApi from "../../api/AxiosApi";
import { Button } from "./ProjectList";
import { useTime } from "framer-motion";

const DropdownContainer = styled.div``;

const DropdownButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: inherit;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const SkillList = styled.button`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border: none;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => (props.clicked ? "#d3d3d3" : "#fff")};
  @media screen and (min-width: 768px) {
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const DropdownMenu = ({ onSkillClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skillsArray, setSkillsArray] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await AxiosApi.getSkilList();
        setSkillsArray(response.data);
      } catch (e) {
        console.error(e);
      }
    };
    getSkills();
  }, []);

  const handleSkillClick = (skillName) => {
    setSelectedSkills((prevSelectedSkills) => {
      const updatedSkills = prevSelectedSkills.includes(skillName)
        ? prevSelectedSkills.filter((skill) => skill !== skillName)
        : [...prevSelectedSkills, skillName];

      return updatedSkills;
    });
  };

  useEffect(() => {
    onSkillClick(selectedSkills);
  }, [selectedSkills, onSkillClick]);

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>
        <Button>스킬필터</Button>
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {skillsArray &&
          skillsArray.map((skills) => (
            <SkillList
              key={skills.skillId}
              onClick={() => handleSkillClick(skills.skillName)}
              clicked={selectedSkills.includes(skills.skillName)}
            >
              {skills.skillName}
            </SkillList>
          ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default DropdownMenu;
