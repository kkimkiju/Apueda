import styled from "styled-components";

const TeamChatPage = () => {
  return (
    <>
      <Body>
        <Container>
          <Head>
            <div></div>
            <div></div>
          </Head>
          <Title>
            <div></div>
            <div></div>
          </Title>
          <ChatBox></ChatBox>
          <TypingBox>
            <SendButtonBox />
          </TypingBox>
        </Container>
      </Body>
    </>
  );
};

export default TeamChatPage;
const Body = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
`;
const Container = styled.div`
  width: 60vw;
  height: auto;
  min-height: 700px;
  border: 0.5vi solid rgb(255, 83, 83);
  border-radius: 4vi;
  margin-top: 2vh;
`;

const Head = styled.div`
  width: 100%;
  height: 5vh;
  background-color: rgb(255, 83, 83);
  border-radius: 3vi 3vi 0 0;
`;
const Title = styled.div`
  width: 100%;
  height: 5vh;
  border-bottom: 0.5vi solid rgb(255, 83, 83);
  box-sizing: border-box; // 외곽선 밖으로 안넘어가게
`;
const ChatBox = styled.div`
width:auto;
height: 600px;
`
const MyProfile = styled.div``;
const OtherProfile = styled.div``;
const TypingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 90%;
  height: 25vh;
  border: 0.5vi solid rgb(255, 83, 83);
  border-radius: 4vi;
  margin: 150px auto 2vh auto ; /* margin을 사용하여 가운데 정렬 */
  box-sizing: border-box; /* box-sizing 추가 */
`;
const SendButtonBox = styled.div``;
