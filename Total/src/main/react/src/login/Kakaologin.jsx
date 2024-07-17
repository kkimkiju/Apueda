import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AxiosApi from "../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserStore";
import Addinfomodal from "../login/Addinfomodal";

const Button = styled.button`
  border: 0;
  height: 40px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Kakaologin = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [accToken, setAccToken] = useState("");
  const context = useContext(UserContext);
  const { setLoginStatus } = context;
  const [addinfomodal, setAddinfomodal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImgPath, setProfileImgPath] = useState("");
  const [nickname, setNickname] = useState("");

  const onAddClickSub = () => {
    setAddinfomodal(true);
  };
  const closeAddSub = () => {
    setAddinfomodal(false);
  };

  const handleAddInfoConfirm = async (identityNumber, name, myInfo, skill) => {
    const user = {
      email,
      password,
      name,
      nickname,
      identityNumber,
      myInfo,
      profileImgPath,
      skill,
    };
    try {
      const response = await AxiosApi.signup(user);
      console.log("생년월일", identityNumber);
      console.log("사진", profileImgPath);
      console.log("Signup 성공:", response);

      const rsp = await AxiosApi.login(email, password);
      localStorage.setItem("email", userInfo.kakao_account.email); // 삭제 예정
      setAccToken(rsp.data.accessToken);
      localStorage.setItem("accessToken", rsp.data.accessToken);
      localStorage.setItem("refreshToken", rsp.data.refreshToken);
      console.log(accToken);
      setLoginStatus(true);
      navigate("/apueda");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  useEffect(() => {
    const initializeKakaoSDK = async () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init("9c189b423acf9491542d699c75845c04"); // 여기에 자신의 앱의 JavaScript 키를 넣으세요
      }
    };

    initializeKakaoSDK();

    const handleAuthCode = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        try {
          const tokenResponse = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            null,
            {
              params: {
                grant_type: "authorization_code",
                client_id: "3ba0bffc2b4266d667888058f56bdfbe", // 여기에 앱 REST API 키를 넣으세요
                redirect_uri: "http://localhost:8118/apueda/kakaologin",
                code: code,
              },
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );

          const { access_token } = tokenResponse.data;
          console.log("토큰", access_token);

          window.Kakao.Auth.setAccessToken(access_token);

          window.Kakao.API.request({
            url: "/v2/user/me",
          })
            .then(async function (response) {
              console.log("사용자정보:", response);
              setUserInfo(response);
              setEmail(response.kakao_account.email);
              setPassword(response.id);
              setNickname(response.properties.nickname);
              setProfileImgPath(response.properties.profile_image);

              const userLookup = await AxiosApi.userCheck(
                response.kakao_account.email
              );
              console.log(userLookup);

              if (userLookup.data === true) {
                const rsp = await AxiosApi.login(
                  response.kakao_account.email,
                  response.id
                );
                localStorage.setItem("email", response.kakao_account.email); // 삭제 예정
                setAccToken(rsp.data.accessToken);
                localStorage.setItem("accessToken", rsp.data.accessToken);
                localStorage.setItem("refreshToken", rsp.data.refreshToken);
                console.log(accToken);
                navigate("/apueda");
                setLoginStatus(true);
              } else {
                onAddClickSub();
              }
            })
            .catch(function (error) {
              console.error("사용자 정보 요청 실패:", error);
            });
        } catch (error) {
          console.error("토큰 요청 실패:", error);
        }
      }
    };

    handleAuthCode();
  }, []);

  const kakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:8118/apueda/kakaologin",
    });
  };

  return (
    <>
      <Button onClick={kakaoLogin}>카카오 로그인</Button>

      <Addinfomodal
        open={addinfomodal}
        close={closeAddSub}
        header="추가정보 입력"
        handleAddInfoConfirm={handleAddInfoConfirm} // onConfirm prop 추가
      />
    </>
  );
};

export default Kakaologin;
