import React, { useState, useEffect } from "react";
import styled from "styled-components";
import adver from "../image/advertis.png";
import { useNavigate } from "react-router-dom";
import testad from "../image/testad.png";

const ModalStyle = styled.div`
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
    width: 90%;
    height: 90%;
    margin: 0 auto;
    border-radius: 0.6rem;
    background-color: #fff;
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      text-align: right;
      width: 100%;
    }
  }
  @media (max-width: 500px) {
    section {
      width: 99%;
      height: 95%;
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
const Button = styled.button`
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: 0;
  font-size: 25px;
  margin-right: 2%;
  margin-top: 2%;
  position: absolute;
  top: 1px;
  right: 1px;
  background: none;
  z-index: 999;
`;
const Imgbox = styled.button`
  width: 100%;
  height: 100%;
  background-image: url(${testad});
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 500px) {
    background-image: url(${adver});
  }
`;
const Adbox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Advertis = (props) => {
  const { open, close } = props;
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (open) {
      setShowButton(false);
      setCountdown(5);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownInterval);
            setShowButton(true);
            return prevCountdown;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000); // 1000ms = 1초

      // Cleanup interval on component unmount or if open changes
      return () => clearInterval(countdownInterval);
    }
  }, [open]);

  const subAd = () => {
    navigate("/apueda/subinfo");
  };
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <Adbox>
              {showButton ? (
                <Button onClick={close}>X</Button>
              ) : (
                <Button>{countdown}</Button>
              )}
              <Imgbox onClick={subAd} />
            </Adbox>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};
export default Advertis;
