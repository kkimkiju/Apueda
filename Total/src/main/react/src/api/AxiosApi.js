import axios from "axios";
import AxiosInstance from "./AxiosInstance";

const Apueda_Domain = "";

const AxiosApi = {
  // 발행된 토큰을 로컬에 저장
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);
  },
  // 로컬에 저장된 토큰 정보 가져오기
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
  // 발행된 리프래시 토큰을 로컬에 저장
  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token);
  },
  // 로컬에 저장된 리프레시 토큰 정보 가져옴
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },

  // 토큰 만료시 재발행하기
  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    console.log("handleUnauthorized");
    const refreshToken = AxiosApi.getRefreshToken();
    const config = {
      headers: {
        "Content-Type": "text/plain",
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    try {
      const rsp = await axios.post(
        `${Apueda_Domain}/auth/reissued`,
        refreshToken,
        config
      );
      console.log(rsp.data.accessToken);
      AxiosApi.setAccessToken(rsp.data.accessToken);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },

  // 사용자 전체리스트 조회
  getUserList: async () => {
    return await AxiosInstance.get("/members/list");
  },

  // 로그인
  login: async (email, password) => {
    const user = {
      email: email,
      password: password,
    };
    return await axios.post(Apueda_Domain + "/auth/login", user);
  },

  // 사용자 존재 여부 확인
  userCheck: async (email) => {
    return await axios.get(`${Apueda_Domain}/auth/check?email=${email}`);
  },
  // 이메일 인증
  mail: async (email) => {
    try {
      return await axios.get(`${Apueda_Domain}/email/mail?email=${email}`);
    } catch (error) {
      throw new Error(`이메일 요청 실패: ${error.message}`);
    }
  },
  // 회원가입
  signup: async (user) => {
    return await axios.post(Apueda_Domain + "/auth/signup", user);
  },
  // 아이디 찾기
  findId: async (user) => {
    return await axios.post(Apueda_Domain + "/auth/findid", user);
  },
  // 비밀번호 찾기(변경하기)
  findPw: async (user) => {
    return await axios.post(Apueda_Domain + "/auth/findpw", user);
  },

  // 사용자 정보 가져오기
  getUserInfo2: async () => {
    return await AxiosInstance.get("/members/memberinfo2");
  },

  // 회원정보 수정
  memberUpdate: async (user) => {
    return await AxiosInstance.post(`/members/membermodify`, user);
  },

  // 회원 탈퇴
  signout: async () => {
    return await AxiosInstance.get(Apueda_Domain + "/members/delmember");
  },

  getBoardList: async () => {
    return await AxiosInstance.get("/board/list");
  },

  getProjectList: async (page) => {
    return await AxiosInstance.get(`/project/list?page=${page}`);
  },
  getProjectAllList: async () => {
    return await AxiosInstance.get(`/project/list-all`);
  },

  boardDelete: async (id) => {
    return await AxiosInstance.get("/board/delete", {
      params: {
        id: id,
      },
    });
  },

  projectDelete: async (id) => {
    return await AxiosInstance.get("/project/delete", {
      params: {
        id: id,
      },
    });
  },

  //------------------친구 기능---------------------------

  friendRequest: async (memberEmail, toMemberEmail) => {
    return await AxiosInstance.post(`/friends/request`, null, {
      params: {
        memberEmail: memberEmail,
        toMemberEmail: toMemberEmail,
      },
    });
  },

  friendlist: async () => {
    return await AxiosInstance.get("/friends/list");
  },

  friendRequestList: async () => {
    return await AxiosInstance.get(`/friends/findrequest`);
  },

  friendRequestAccept: async (memberEmail) => {
    return await AxiosInstance.get("/friends/accept", {
      params: {
        memberEmail: memberEmail,
      },
    });
  },

  friendRequestReject: async (memberEmail) => {
    return await AxiosInstance.get("/friends/reject", {
      params: {
        memberEmail: memberEmail,
      },
    });
  },

  friendDelete: async (friendEmail) => {
    return await AxiosInstance.get("/friends/delete", {
      params: {
        friendEmail: friendEmail,
      },
    });
  },

  //------------------친구 기능---------------------------

  //메세지
  messageList: async (sendEmail) => {
    return await AxiosInstance.get("/messages/received", {
      params: {
        sendEmail: sendEmail,
      },
    });
  },

  writeMessage: async (receiverMemberName, content) => {
    return await AxiosInstance.post("/messages/write", {
      receiverMemberName: receiverMemberName,
      content: content,
    });
  },

  delMsg: async (postMsgId) => {
    return await AxiosInstance.get("/messages/delete", {
      params: {
        id: postMsgId,
      },
    });
  },

  updateReadCheck: async (friendEmail) => {
    return await AxiosInstance.post("/friends/updateReadCheck", null, {
      params: {
        friendEmail: friendEmail,
      },
    });
  },

  //-------------------------------------------메세지------------------------------------------------

  //마이 프로젝트(김기주)
  myProjectList: async () => {
    return await AxiosInstance.get("/chat/myproject");
  },

  myProjectApplyList: async () => {
    return await AxiosInstance.get("/apply/list");
  },

  //마이 프로젝트(김기주)

  // ----------------------- 게시판 시작 -----------------------
  // 스킬 리스트 가지고 오기(등록용)
  getSkilList: async () => {
    return await AxiosInstance.get("/skill/list");
  },
  // 플젝 글쓰기
  postProject: async (postData) => {
    console.log("postProject chatRoom", postData.imgPath);
    const project = {
      projectTitle: postData.title,
      projectContent: postData.content,
      // projectPassword: postData.pw,
      skillName: postData.skills,
      projectTime: postData.projectTime,
      recruitNum: postData.recruitNum,
      projectName: postData.roomName,
      regDate: postData.currentDate,
      chatRoom: { roomId: postData.chatRoom },
      imgPath: postData.imgPath,
    };

    return await AxiosInstance.post("/project/insert", project);
  },
  // 플젝 상세 보기
  getProjectDetail: async (projectId) => {
    return await AxiosInstance.get(`/project/detail/${projectId}`);
  },

  // 내가 쓴 플젝 보기
  getMyProjectList: async () => {
    return await AxiosInstance.get("/project/mypj");
  },
  // 플젝 수정
  modifyProject: async (projectId, postData) => {
    console.log("modifyProject postData", postData);
    return await AxiosInstance.put(`/project/modify/${projectId}`, postData);
  },

  // 자유 게시판 상세 보기
  getBoardDetail: async (boardId) => {
    return await AxiosInstance.get(`/board/detail/${boardId}`);
  },

  // 내가 쓴 자유게시판 보기
  getMyBoardList: async () => {
    return await AxiosInstance.get("/board/myboard");
  },
  // 자유 게시판 글쓰기
  postBoard: async (postData) => {
    return await AxiosInstance.post("/board/insert", postData);
  },

  // 댓글 등록
  postReply: async (replyContent, projectId, boardId) => {
    const reply = {
      content: replyContent,
      projectId: projectId,
      boardId: boardId,
    };
    console.log("axios ", replyContent);
    return await AxiosInstance.post("/reply/insert", reply);
  },
  // 플젝 게시글 댓글 페이징 리스트 불러오기
  getProjectReplyList: async (projectId, page) => {
    return await AxiosInstance.get(
      `/reply/project-reply/${projectId}/page?page=${page}`
    );
  },
  // 자유 게시글 댓글 페이징 리스트 불러오기
  getBoardReplyList: async (boardId, page) => {
    return await AxiosInstance.get(
      `/reply/board-reply/${boardId}/page?page=${page}`
    );
  },
  // 댓글 총 갯수 가지고 오기
  getReplyCount: async (page) => {
    return await AxiosInstance.get(`/reply/count?page=${page}`);
  },

  // ----------------------- 게시판 끝 -----------------------
  // -----------------------채   팅-----------------------
  // 방 생성
  createRoom: async (roomName, max_count) => {
    const roomData = { roomName: roomName, max_count: max_count };
    return await AxiosInstance.post("/chat/create", roomData);
  },
  // 오픈채팅방 생성
  createOpenRoom: async (roomName) => {
    const roomData = { roomName: roomName };
    return await AxiosInstance.post("/chat/create-open-chat", roomData);
  },
  // 방 입장 플젝, 오픈 공통
  joinRoom: async (roomId) => {
    return await AxiosInstance.post(`/chat/join-to-room/${roomId}`);
  },
  // 방 퇴장
  exitRoom: async (roomId) => {
    return await AxiosInstance.post(`/chat/exit/${roomId}`);
  },

  // 입장 중인 방 리스트 찾기
  getJoinedRooms: async (memberId) => {
    try {
      const response = await AxiosInstance.get("/chat/find-my-room", {
        params: { memberId: memberId },
      });
      return response;
    } catch (error) {
      throw new Error("Error fetching joined rooms: " + error.message);
    }
  },
  // 입장 중인 오픈채팅방 리스트 찾기
  getJoinedOpenChatRooms: async (memberId) => {
    try {
      const response = await AxiosInstance.get("/chat/find-my-open-chat", {
        params: { memberId: memberId },
      });
      return response;
    } catch (error) {
      throw new Error("Error fetching joined rooms: " + error.message);
    }
  },
  // 전체 오픈채팅방 조회 postType을 false로 보내야 오픈채팅방이 조회됨
  getOpenChatList: async (postType) => {
    return await AxiosInstance.post("/chat/find-open-chat-list", { postType });
  },

  // 방 이름으로 방 찾기
  findRoomByRoomName: async (roomName) => {
    return await AxiosInstance.get(`/chat/find-room/${roomName}`);
  },

  // 방의 메시지 가져오기
  getChatMessages: async (roomId) => {
    return await AxiosInstance.get(`/chat/${roomId}/messages`);
  },
  // 프로젝트 요청 조회
  searchRequest: async () => {
    return await AxiosInstance.get(`/apply/list/`);
  },
  // 프로젝트 전체 요청 조회(신청한 사람 재 신청 막기위해 생성 )
  searchAllRequest: async (projectId, email) => {
    return await AxiosInstance.get(`/apply/all-list/${projectId}/${email}`);
  },

  // 프로젝트 요청
  requestProject: async (postData) => {
    console.log("postData", postData);
    return await AxiosInstance.post(`/apply/insert`, postData);
  },

  ProjectRequestAccept: async (applyId) => {
    return await AxiosInstance.post("/apply/accept", {
      applyId: applyId, // applyId를 Request Body에 담아 보냄
    });
  },

  ProjectRequestReject: async (applyId) => {
    return await AxiosInstance.post("/apply/reject", applyId, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  ProjectKickOut: async (roomid, memberId, projectId) => {
    return await AxiosInstance.get("/project/kick", {
      params: {
        roomId: roomid,
        memberId: memberId,
        projectId: projectId,
      },
    });
  },

  ProjectExit: async (roomid, memberId) => {
    return await AxiosInstance.get("/project/exit", {
      params: {
        roomId: roomid,
        memberId: memberId,
      },
    });
  },

  // -----------------------채   팅-----------------------
  // -----------------------데이트 어플-----------------------
  // 좋아요 이후 친구 신청

  // 싫어요 이후 DB 저장
  unlikeFriendRequest: async (memberEmail, unlikeMemberEmail) => {
    console.log("Sending unlike request:", memberEmail, unlikeMemberEmail);
    return await AxiosInstance.post(`/datingapp/unlike`, null, {
      params: {
        memberEmail: memberEmail,
        unlikeMemberEmail: unlikeMemberEmail,
      },
    });
  },
  // 카드리스트 가져오기 (백엔드에서 현재 5개만 가져오도록 설정 됨)
  getCardList: async (myEmail) => {
    return await AxiosInstance.post(`/datingapp/cardlist`, null, {
      params: {
        myEmail: myEmail,
      },
    });
  },
  // 정기구독 여부 확인
  checkSubscribe: async () => {
    const accessToken = AxiosApi.getAccessToken();
    console.log("AccessToken:", accessToken); // 콘솔 로그 추가
    try {
      const response = await AxiosInstance.post(`/datingapp/check-subscribe`, {
        accessToken: accessToken,
      });
      console.log("Response from server:", response.data); // 서버 응답 로그 추가
      return response;
    } catch (error) {
      console.error("Error in checkSubscribe:", error);
      throw error;
    }
  },
  // -----------------------데이트 어플-----------------------
};

export default AxiosApi;
