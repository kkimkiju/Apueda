import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillClick = (skillName) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skillName)) {
        return prevSkills.filter((skill) => skill !== skillName);
      } else {
        return [...prevSkills, skillName];
      }
    });
  };

  return (
    <SearchContext.Provider value={{ selectedSkills, handleSkillClick }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
