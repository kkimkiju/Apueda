import { Container, ContainerBack } from "../../style/ModalStyle.js";
import AxiosApi from "../../api/AxiosApi.js";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../style/WriteStyle.js";
import styled from "styled-components";

const Notice = styled.div``;
const Input = styled.input``;
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
    //console.log("수정실행");
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
    //console.log("수정데이터 제목 불러옴", modifyData);
    setInputRoomName(modifyData);
  }, [modifyData]);
  return (
    <ContainerBack>
      <Container ref={modalRef} style={{ width: "500px", height: "500px" }}>
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
