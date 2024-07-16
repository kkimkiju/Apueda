// import React, { useState, useEffect } from "react";
// import { HeadContainer, SelectBoardButton } from "../../style/SelectBoardStyle";

// const SelectBoard = ({ setIsClick }) => {
//   const [selectedButton, setSelectedButton] = useState({
//     a: true,
//     b: false,
//   });

//   // 버튼 클릭 시 호출되는 함수
//   const handleClick = (buttonType) => {
//     const newState = {
//       a: buttonType === "a",
//       b: buttonType === "b",
//     };
//     setSelectedButton(newState); // selectedButton 상태 업데이트
//   };

//   // selectedButton이 변경될 때마다 실행되는 useEffect
//   useEffect(() => {
//     setIsClick(selectedButton); // setIsClick에 업데이트된 selectedButton 상태 전달
//   }, [selectedButton, setIsClick]);

//   return (
//     <HeadContainer>
//       <SelectBoardButton
//         isSelected={selectedButton.a}
//         buttonType="a"
//         onClick={() => handleClick("a")}
//       >
//         <span>프로젝트 구인</span>
//       </SelectBoardButton>
//       <SelectBoardButton
//         isSelected={selectedButton.b}
//         buttonType="b"
//         onClick={() => handleClick("b")}
//       >
//         <span>자유 게시판</span>
//       </SelectBoardButton>
//     </HeadContainer>
//   );
// };

// export default SelectBoard;
