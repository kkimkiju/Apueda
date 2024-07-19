import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  // 로그인 여부
  const [loginStatus, setLoginStatus] = useState(
    localStorage.getItem("loginStatus") || ""
  );
  // 구독 여부
  const [subscribeStatus, setSubscribeStatus] = useState(
    localStorage.getItem("subscribeStatus") || ""
  );
  // 프로필 사진 변경
  const [profileChange, setProfileChange] = useState(
    localStorage.getItem("profileChange") || ""
  );

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
    console.log(localStorage.getItem("loginStatus"));
  }, [loginStatus]);
  useEffect(() => {
    localStorage.setItem("subscribeStatus", subscribeStatus);
    console.log(localStorage.getItem("subscribeStatus"));
  }, [subscribeStatus]);
  useEffect(() => {
    localStorage.setItem("profileChange", subscribeStatus);
    console.log(localStorage.getItem("profileChange"));
  }, [profileChange]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        subscribeStatus,
        setSubscribeStatus,
        profileChange,
        setProfileChange,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
