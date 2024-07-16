import styled from "styled-components";

export const ModalStyle = styled.div`
  .modal {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }

  section {
    width: 30%;
    height: 80%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;

    header {
      position: relative;
      height: 10%;
      background-color: #f92f23;
      font-weight: 700;
      align-content: center;
      color: white;
      font-size: 18px;
      button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:hover {
          color: #000;
        }
      }
    }
  }
  @media (max-width: 500px) {
    section {
      width: 100%;
      height: 100%;
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Button = styled.button`
  outline: none;
  color: #000000;
  background-color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  width: 100px;
  height: 50px;
  border: 1px solid #f92f23;
  background-color: white;
  margin-right: 30px;
  &:hover {
    background-color: #f92f23;
    color: white;
  }
`;

export const TerCon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 90%;
`;

export const Terbox = styled.div`
  border: 2px solid #e9ecef;
  width: 90%;
  height: 85%;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  /* Custom Scrollbar Styles */
  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* color of the tracking area */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f92f23; /* color of the scroll thumb */
    border-radius: 6px; /* roundness of the scroll thumb */
    border: 3px solid #f1f1f1; /* creates padding around scroll thumb */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #c62d1f; /* color of the scroll thumb when hovered */
  }
`;

export const Grayline = styled.div`
  width: 100%;
  height: 2px;
  background-color: #dee2e6;
`;

export const Bubox = styled.div`
  text-align: right;
  width: 100%;
`;
