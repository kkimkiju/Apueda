import styled from "styled-components";

export const Title = styled.input`
  border-width: 0 0 1px;
  width: 85%;
  height: 56px;
  padding: 32px;
  margin-top: 16px;
  font-size: 1.5rem;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 500px) {
    padding: 6px;
    font-size: 1rem;
  }
`;

export const InputButtonSection = styled.div`
  display: flex;
  width: 85%;
  padding: 12px 32px;
  @media screen and (max-width: 768px) {
    padding: 6px 16px;
  }
  @media screen and (max-width: 500px) {
    padding: 6px;
  }
  & button {
    margin-left: 8px;
  }
`;

export const Button = styled.button`
  border: 0;
  color: #ffffff;
  background-color: #ff5353;
  border-radius: 26px;

  height: 32px;
  width: 40px;
  overflow: hidden;
  &:last-child {
    /* margin-right: 0; */
  }
  @media screen and (max-width: 768px) {
    height: 22px;
    font-size: 8px;
  }
  @media screen and (max-width: 500px) {
    height: auto;
    width: auto;
    font-size: 8px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  padding: 16px;
  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (max-width: 500px) {
    padding: 8px;
  }
`;

export const ConfirmButton = styled.button`
  border: 0;
  border-radius: 26px;
  background-color: #ffffff;
  border: 5px solid #ff5353;
  width: 100px;
  height: 42px;

  @media screen and (max-width: 500px) {
    width: 50px;
    height: 28px;
    font-size: 11px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  list-style-type: none;
  background-color: #ffffff;
  border-radius: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 16px;
  @media screen and (max-width: 500px) {
    padding: 8px;
  }
`;

export const Top = styled.div`
  color: #ffffff;
  align-content: center;
  font-size: 1.5rem;
  bottom: 1rem;
  position: relative;
  @media screen and (max-width: 500px) {
    bottom: 0;
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  @media screen and (max-width: 500px) {
    width: 90%;
    padding: 18px 0;
  }
`;

export const DropdownInput = styled.div`
  position: absolute;
  top: 100%;
  left: -66px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  margin-right: 16px;
  background-color: #ff5353;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  @media screen and (max-width: 500px) {
    left: 0;
    width: 130px;
    height: 80px;
    & button {
      width: 48px;
      height: 24px;
      font-size: 8px;
    }
  }
  input {
    width: 200px;
    padding: 5px;
    @media screen and (max-width: 500px) {
      width: 100%;
      height: 40%;
      font-size: 8px;
    }
  }
`;
export const InsertConfirm = styled.button`
  border: 0;
  background-color: #fff;
  color: #ff5353;
  border-radius: 26px;
  width: 60px;
  height: 30px;
`;
export const InputImage = styled.input`
  display: none;
`;

export const Content = styled.textarea`
  border-width: 1px 0 1px;
  margin: 10px 0;
  width: 85%;
  height: 580px;
  padding: 32px;
  font-size: 1.2rem;
  overflow: auto;
  @media screen and (max-width: 500px) {
    padding: 6px;
    height: 300px;
    font-size: 12px;
  }
  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer; /* 스크롤바 hover 시 커서 변경 */
  }

  &::-webkit-scrollbar-thumb {
    background: #ff5353; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 둥근 테두리 */
  }

  &::-webkit-scrollbar-track {
    background: rgba(220, 20, 60, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;
