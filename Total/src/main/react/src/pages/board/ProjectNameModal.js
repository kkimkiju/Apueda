import { ContainerBack } from "../../style/ModalStyle.js";
import AxiosApi from "../../api/AxiosApi.js";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../style/WriteStyle.js";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 2px solid #ff5353;
  border-radius: 100px;
  z-index: 1000;

  @media (max-width: 500px) {
    width: 300px;
    height: 300px;
  }
`;
const Notice = styled.div``;
const Input = styled.input`
  margin-bottom: 8px;
`;
const ProjectNameModal = ({
  onRoomNameSave,
  closeProjectNameModal,
  onClick,
  modifyData,
}) => {
  const modalRef = useRef(null);
  const [inputRoomName, setInputRoomName] = useState(""); // 채팅방(플젝)이름 입력 상태 관리
  // 모달 외 다른 곳 클릭 시 모달 닫기
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeProjectNameModal();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const handleSave = async () => {
    try {
      await onRoomNameSave(inputRoomName);
      onClick(inputRoomName);
      setInputRoomName("");
      closeProjectNameModal();
    } catch (error) {
      console.error("Error saving:", error);
      // Handle error saving room name or password if needed
    }
  };
  useEffect(() => {
    setInputRoomName(modifyData);
  }, [modifyData]);
  return (
    <ContainerBack>
      <Container ref={modalRef}>
        {modifyData ? (
          <>
            <Notice>
              <span>채팅방의 이름은 수정이 불가능합니다.</span>
            </Notice>
            <p></p>
            <Input
              onChange={(e) => setInputRoomName(e.target.value)}
              value={inputRoomName}
              disabled
            ></Input>
          </>
        ) : (
          <>
            <Notice>
              <span>프로젝트 채팅방의 이름을 입력해주세요</span>
            </Notice>
            <p></p>
            <Input
              onChange={(e) => setInputRoomName(e.target.value)}
              value={inputRoomName}
            ></Input>
          </>
        )}
        <Button onClick={handleSave}>저장</Button>
      </Container>
    </ContainerBack>
  );
};

export default ProjectNameModal;
