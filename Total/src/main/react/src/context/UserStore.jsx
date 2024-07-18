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

  useEffect(() => {
    localStorage.setItem("loginStatus", loginStatus);
  }, [loginStatus]);
  useEffect(() => {
    localStorage.setItem("subscribeStatus", subscribeStatus);
  }, [subscribeStatus]);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
        setLoginStatus,
        subscribeStatus,
        setSubscribeStatus,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserStore;
