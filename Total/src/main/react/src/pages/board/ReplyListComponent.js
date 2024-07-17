import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  PageNum,
  ReplyListContainer,
  ReplyContainer,
  InputContainer,
  UpInert,
  ProfileImg,
} from "../../style/ProjectDetailStyle";
import AxiosApi from "../../api/AxiosApi";
import { formatDate, formatTimestamp } from "../../utils/formatDate";
import { Button } from "../../style/WriteStyle";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/UserStore";

const NickName = styled.div`
  padding: 8px;
`;

const RegDate = styled.div`
  padding: 4px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* width: 50%; */
  height: 60px;
`;
const Input = styled.textarea`
  width: 70%;
  height: auto;
  margin-left: 10px;
  resize: none;
  background-color: #fbfcfc;
  border: 0.5px solid #d0d3d7;
  border-radius: 6px;
  overflow: hidden;
  font-size: 1rem;
  z-index: 2;

  @media screen and (max-width: 860px) {
    font-size: 0.8rem;
  }
  &:focus {
    border: 0.8px solid #000;
    outline: none; /* 추가: 기본 포커스 아웃라인 제거 */
  }
`;

const ConfirmReply = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const List = styled.div``;
const ListResult = styled.div``;
const ReplyList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & div.replies {
    display: flex;
    flex-direction: row;
    border: 0.5px solid #b9b9b9;
    border-width: 0 0 0.5px;
    padding: 12px;
  }
`;
const ReplyContent = styled.div`
  width: 78%;
  padding: 8px;
`;
const PageButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
  background-color: ${(props) => (props.active ? "#FFD6D6" : "")};
  border-radius: 36px;
  width: 32px;
  @media screen and (max-width: 860px) {
    width: 16px;
  }
`;
const NoReply = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Setting = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ReplyListComponent = ({ projectId, boardId, type, userInfo }) => {
  const [replies, setReplies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPageSize, setTotalPageSize] = useState(0); // 총 페이지 수
  const [imageUrl, setImageUrl] = useState(null);
  const email = localStorage.getItem("email");
  //const [userInfo, setUserInfo] = useState(null);
  //const { userInfo } = useContext(UserContext);
  const [replyContent, setReplyContent] = useState("");
  const [repliesChanged, setRepliesChanged] = useState(false);
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  // const imageUrl = userInfo?.profileImg || "";

  useEffect(() => {
    getReplyList(projectId, currentPage);
  }, [projectId, repliesChanged, currentPage]);

  const getReplyList = async (id, page) => {
    try {
      if (type === "project") {
        const response = await AxiosApi.getProjectReplyList(projectId, page);
        console.log(" 플젝 댓글 리스트 : ", response.data.replies);
        // console.log("프로필 url : ", response.data.ProfileImg);

        if (Array.isArray(response.data.replies)) {
          const formattedData = response.data.replies.map((reply) => ({
            ...reply,
            regDate: formatDate(reply.regDate),
          }));
          setReplies(formattedData);
          setTotalPageSize(response.data.totalPages);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } else {
        const response = await AxiosApi.getBoardReplyList(boardId, page);
        console.log(" 게시판 댓글 리스트 : ", response.data);
        // console.log("프로필 url : ", response.data.ProfileImg);

        if (Array.isArray(response.data.replies)) {
          const formattedData = response.data.replies.map((reply) => ({
            ...reply,
            regDate: formatDate(reply.regDate),
          }));
          setReplies(formattedData);
          setTotalPageSize(response.data.totalPages);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 따라 높이 조절
    }
  };

  const sendReply = () => {
    const postReply = async () => {
      try {
        const response = await AxiosApi.postReply(
          replyContent,
          projectId,
          boardId
        );
        //console.log("response ", replyContent);
        if (response.data) {
          alert("댓글 등록 성공!!!!!!!!!!!!");
          setRepliesChanged((prev) => !prev);
          setReplyContent(""); // 댓글 입력 필드 초기화
        } else {
          throw new Error("댓글 등록이 실패했습니다.");
        }
      } catch (error) {
        console.log(error);
        alert("댓글 등록 실패ㅠㅠㅠㅠㅠㅠㅠㅠㅠ");
      }
    };
    postReply();
  };
  // 페이지 이동
  const handlePageChange = (number) => {
    console.log("클릭 버튼 ", number);
    setCurrentPage(number);
  };
  const prev = () => {
    console.log("pageNum", currentPage);
    if (currentPage === 0) {
      alert("첫번째 페이지다");
    } else {
      setCurrentPage(currentPage - 1);
      console.log(currentPage);
    }
  };

  const next = () => {
    if (currentPage < totalPageSize - 1) {
      // currentPage가 totalPageSize보다 작을 때만 다음 페이지로 이동
      setCurrentPage(currentPage + 1); // 현재 페이지를 다음 페이지로 설정
    } else {
      alert("마지막 페이지입니다.");
    }
  };
  return (
    <ReplyContainer>
      <InputContainer>
        {userInfo && (
          <UpInert>
            <Profile>
              <ProfileImg>
                <img src={imageUrl} alt="profile" />
              </ProfileImg>
              <NickName>{userInfo.nickname}</NickName>
            </Profile>
            <Input
              ref={textareaRef}
              placeholder="클린한 댓글을 입력해주세요(500자)"
              onInput={handleInput}
              rows={1}
              maxLength={500}
              onChange={(e) => setReplyContent(e.target.value)}
              value={replyContent}
            />
            <ConfirmReply>
              <Button onClick={sendReply}>등록</Button>
            </ConfirmReply>
          </UpInert>
        )}
      </InputContainer>

      <ReplyListContainer>
        {replies.length !== 0 ? (
          replies.map((reply, index) => (
            <ReplyList>
              <div className="replies" key={index}>
                <ProfileImg>
                  <img src={reply.profileImg} alt="profile" />
                </ProfileImg>
                <NickName>{reply.nickName}</NickName>
                <ReplyContent>{reply.content}</ReplyContent>
                <RegDate style={{ fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                  {reply.regDate}
                </RegDate>
              </div>
            </ReplyList>
          ))
        ) : (
          <ReplyList>
            <NoReply>
              댓글이 아직 등록 되지 않았습니다. 먼저 댓글을 등록해보세요!
            </NoReply>
          </ReplyList>
        )}
        <PageNum>
          <Button onClick={prev}>&lt;</Button>
          {replies.length === 0 ? (
            <PageButton> 1 </PageButton>
          ) : (
            Array.from({ length: totalPageSize }, (_, i) => i + 1).map(
              (page) => {
                const startPage = Math.floor(currentPage / 10) * 10 + 1;
                if (page >= startPage && page < startPage + 10) {
                  return (
                    <PageButton
                      key={page}
                      onClick={() => handlePageChange(page - 1)}
                      active={currentPage === page - 1}
                    >
                      {page}
                    </PageButton>
                  );
                } else {
                  return null;
                }
              }
            )
          )}
          <Button onClick={next}>&gt;</Button>
        </PageNum>
      </ReplyListContainer>
    </ReplyContainer>
  );
};

export default ReplyListComponent;
