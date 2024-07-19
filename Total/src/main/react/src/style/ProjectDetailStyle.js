import styled from "styled-components";

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const UpHead = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px;
  border: solid #b9b9b9;
  border-width: 0 0 1px;

  @media screen and (max-width: 860px) {
    padding: 0;
  }
  @media screen and (max-width: 500px) {
    font-size: 8px;
  }
`;

export const UnderHead = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: solid #b9b9b9;
  border-width: 0 0 1px;
  padding: 12px;

  @media screen and (max-width: 860px) {
    padding: 0;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  //height: 1000px;
  height: auto;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 500px) {
  }
`;

export const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  border: 1px solid #bbbbbb;
  border-radius: 12px;
`;

export const UpInert = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 16px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 8px;
  }
`;

export const UnderInert = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 40%;
  padding: 12px;
`;

export const ReplyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

export const PageNum = styled.div`
  display: flex;
  align-content: center;
  margin-top: 1rem;
  width: 80%;
  justify-content: space-evenly;
`;
export const ProfileImg = styled.div`
  padding: 8px;
  @media screen and (max-width: 768px) {
    padding: 1px;
  }
  & img {
    width: 35px;
    height: 35px;
    border-radius: 40px;
    object-fit: cover;
    @media screen and (max-width: 768px) {
      width: 18px;
      height: 18px;
    }
  }
`;
