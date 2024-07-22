import styled from "styled-components";
import "./App.css"; // 특정 컴포넌트 스타일 폰트 적용위해 사용
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GlobalStyle from "./font/GlobalStyle";
import MypageMain from "./mypages/MypageMain";
import Mypj from "./mypages/Mypj";
import Subinfo from "./subscribe/subinfo";
import Mywrite from "./mypages/Mywrite";
import LoginPage from "./login/Login";
import SignUp from "./login/Signup";
import MemberUpdate from "./login/MemberUpdate";
import FindId from "./login/FindId";
import FindPw from "./login/FindPw";
import Upload from "./api/firebase/ImageUploader";
import UserStore, { UserContext } from "./context/UserStore";

import Header from "./components/Header";
import NaviBar from "./components/NaviBar";
import Mainpage from "./pages/mainpage";
import TeamChatPage from "./pages/chat/teamchatpage";
import ChatManage from "./pages/chat/Chatmanage";
import ChatMain from "./pages/chat/ChatMain";
import DatingApp from "./pages/datingapp-page/datingApp";
import EditInfo from "./mypages/EditInfo";
import Friend from "./mypages/Friend";
import BoardMain from "./pages/board/BoardMain";
import WriteProject from "./pages/board/WriteProject";
import ProjectDetail from "./pages/board/ProjectDetail";
import Mysub from "./subscribe/mysub";
import Footer from "./components/Footer";
import BoardDetail from "./pages/board/BoardDetail";
import WriteBoard from "./pages/board/WirteBoard";
import ChatRoom from "./pages/chat/ChatRoom";
import Kakaologin from "./login/Kakaologin";
import Advertis from "./components/advertis";
import { useContext, useEffect, useState } from "react";
import AxiosApi from "./api/AxiosApi";

function App() {
  const [showAdvertis, setShowAdvertis] = useState(false);
  const [substatus, setSubstatus] = useState("");
  const member = localStorage.getItem("email");

  const fetchDeadline = async () => {
    try {
      let response = await AxiosApi.deadline(member);
      if (response && response.data) {
        setSubstatus(response.data[0].status);
      } else {
        setSubstatus(null);
        console.error("No deadline data in response");
      }
    } catch (error) {
      console.error("Error fetching deadline:", error);
    }
  };

  useEffect(() => {
    fetchDeadline();
  }, []);

  useEffect(() => {
    if (substatus !== "구독") {
      const interval = setInterval(() => {
        setShowAdvertis(true);
      }, 600000); // 10분마다 실행

      return () => clearInterval(interval);
    }
  }, [substatus]);

  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Header />
          <NaviBar />
          <Routes>
            {/*첫 메인 페이지 경로*/}
            <Route path="/" element={<Navigate to="/apueda" />} />
            <Route path="/apueda" element={<Mainpage />} />
            <Route path="/apueda/mypage" element={<MypageMain />} />
            <Route path="/apueda/chatmainpage" element={<ChatMain />} />
            <Route path="/apueda/chatmanage" element={<ChatManage />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/apueda/datingapp" element={<DatingApp />} />
            <Route path="/apueda/board" element={<BoardMain />} />
            <Route
              path="/apueda/board/projectDetail/:projectId"
              element={<ProjectDetail />}
            />
            <Route
              path="/apueda/board/boardDetail/:boardId"
              element={<BoardDetail />}
            />

            <Route
              path="/apueda/modify/project/:projectId"
              element={<WriteProject />}
            />
            <Route
              path="/apueda/modify/board/:boardId"
              element={<WriteBoard />}
            />
            <Route path="/apueda/writeproject" element={<WriteProject />} />
            <Route path="/apueda/writeboard" element={<WriteBoard />} />
            <Route path="/apueda/mypage/mypj" element={<Mypj />} />
            <Route path="/apueda/mypage/mywrite" element={<Mywrite />} />
            <Route path="/apueda/subinfo" element={<Subinfo />} />
            <Route path="/apueda/login" element={<LoginPage />} />
            <Route path="/apueda/signup" element={<SignUp />} />
            <Route path="/apueda/findid" element={<FindId />} />
            <Route path="/apueda/findpw" element={<FindPw />} />
            <Route
              path="/apueda/mypage/memberupdate"
              element={<MemberUpdate />}
            />
            <Route path="/apueda/mypage/editinfo" element={<EditInfo />} />
            <Route path="/apueda/mypage/friend" element={<Friend />} />
            <Route path="/apueda/mysub" element={<Mysub />} />
            <Route path="/apueda/kakaologin" element={<Kakaologin />} />
          </Routes>
        </Router>
      </UserStore>
      {showAdvertis && (
        <Advertis open={showAdvertis} close={() => setShowAdvertis(false)} />
      )}
    </>
  );
}

export default App;
