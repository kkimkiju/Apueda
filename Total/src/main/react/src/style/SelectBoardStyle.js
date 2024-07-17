import styled from "styled-components";

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 54px;
  background-color: #ff5353;
  border-radius: 30px 30px 0 0;
  @media screen and (max-width: 500px) {
    height: 32px;
  }
`;

export const SelectBoardButton = styled.button`
  width: 50%;
  height: auto;
  border-radius: ${(props) =>
    props.buttonType === "a"
      ? "30px 0 25px 0"
      : props.isSelected
      ? "0 30px 0 0"
      : "0 30px 0 25px"};
  border: none;
  background-color: ${(props) => (props.isSelected ? "#ff5353" : "#ffffff")};
  color: ${(props) => (props.isSelected ? "#ffffff" : "#000000")};
  &:hover {
    cursor: pointer;
  }
`;
