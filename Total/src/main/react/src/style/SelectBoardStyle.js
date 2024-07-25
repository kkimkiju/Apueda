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

export const SelectBoardButton = styled.button.attrs((props) => ({
  buttontype: props.buttontype,
}))`
  width: 50%;
  height: auto;
  border-radius: ${(props) =>
    props.buttontype === "a"
      ? "30px 0 25px 0"
      : props.isselected === "true"
      ? "0 30px 0 0"
      : "0 30px 0 25px"};
  border: none;
  background-color: ${(props) =>
    props.isselected === "true" ? "#ff5353" : "#ffffff"};
  color: ${(props) => (props.isselected === "true" ? "#ffffff" : "#000000")};
  &:hover {
    cursor: pointer;
  }
`;
