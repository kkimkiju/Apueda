import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SelectBoardButton } from "../../style/SelectBoardStyle"; // SelectBoardButton 스타일링 컴포넌트 가져오기

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 54px;
  background-color: #ff5353;
  border-radius: 30px 30px 0 0;
  @media screen and (max-width: 768px) {
    height: 32px;
    font-size: 10px;
  }
`;
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #ff5353;
  font-size: 0.7rem;
  /* padding-top: 18px;
  padding-left: 18px; */
`;
const WriteBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 50px;
  border-radius: 36px;
  margin-right: 18px;
  color: #ff5353;
  background-color: #ffffff;
`;

const SearchFilter = styled.div`
  margin-left: 16px;
  color: #ffffff;
`;

const HeadBar = ({ setIsClick }) => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState({
    a: true,
    b: false,
  });

  // 버튼 클릭 시 호출되는 함수
  const handleClick = (buttonType) => {
    const newState = {
      a: buttonType === "a",
      b: buttonType === "b",
    };
    setSelectedButton(newState); // selectedButton 상태 업데이트
  };

  // selectedButton이 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    setIsClick(selectedButton); // setIsClick에 업데이트된 selectedButton 상태 전달
  }, [selectedButton, setIsClick]);

  return (
    <>
      <HeadContainer>
        <SelectBoardButton
          isSelected={selectedButton.a}
          buttonType="a"
          onClick={() => handleClick("a")}
        >
          <span>프로젝트 구인</span>
        </SelectBoardButton>
        <SelectBoardButton
          isSelected={selectedButton.b}
          buttonType="b"
          onClick={() => handleClick("b")}
        >
          <span>자유 게시판</span>
        </SelectBoardButton>
      </HeadContainer>
      <SearchContainer>
        <SearchFilter></SearchFilter>
        {selectedButton.a ? (
          <WriteBoard onClick={() => navigate("/apueda/writeproject")}>
            글쓰기
          </WriteBoard>
        ) : (
          <WriteBoard onClick={() => navigate("/apueda/writeboard")}>
            글쓰기
          </WriteBoard>
        )}
      </SearchContainer>
    </>
  );
};

export default HeadBar;