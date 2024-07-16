import React, { useState } from "react";
import styled from "styled-components";
import { LongInput, SubmitBtn } from "./style/SignFormStyle";
import { useNavigate } from "react-router-dom";

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 300px;
  background: rgba(255, 83, 53);
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  & h2 {
    margin-bottom: 40px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const PasswordModal = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [pwdValid, setPwdValid] = useState(false);
  const [pwdConcord, setPwdConcord] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwdValid && pwdConcord) {
      onSubmit(password);
      navigate("/apueda/login");
    }
  };

  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}:;',.?/\\-]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "비밀번호는 숫자, 영어 소문자, 특수문자를 모두 포함하여 8자 이상이어야 합니다."
      );
      setPwdValid(false);
    } else {
      setPasswordError("");
      setPwdValid(true);
    }
  };

  const onChangePassword2 = (e) => {
    const newPassword = e.target.value;
    setPassword2(newPassword);
    if (password === newPassword) {
      setPwdConcord(true);
      setPasswordError2("");
    } else {
      setPwdConcord(false);
      setPasswordError2("비밀번호가 일치하지 않습니다.");
    }
  };
  const allValid = pwdValid && pwdConcord;
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>새 비밀번호 입력</h2>
        <form onSubmit={handleSubmit}>
          <LongInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChangePassword}
          />
          <span id="hint">
            {password.length > 0 && (
              <p className={pwdValid ? "success" : "error"}>{passwordError}</p>
            )}
          </span>
          <LongInput
            type="password"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={onChangePassword2}
          />
          <span id="hint">
            {password2.length > 0 && (
              <p className={pwdConcord ? "success" : "error"}>
                {passwordError2}
              </p>
            )}
          </span>
          <SubmitBtn type="submit" disabled={!allValid}>
            확인
          </SubmitBtn>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PasswordModal;
