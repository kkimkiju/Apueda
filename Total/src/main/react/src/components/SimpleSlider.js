import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import googlelogo from "../image/share_google_play_logo.png";
import lovechaticon from "../image/lovechat.png";
import teamicon from "../image/team-icon.png";
import alien from "../image/alien.png";
import couple from "../image/couple.png";

export default function SimpleSlider() {
  const navigate = useNavigate();
  var settings = {
    dots: true, //아래 원형 버튼 여부
    infinite: true, // 슬라이드 반복 여부
    speed: 1000, // 슬라이드 속도 1초
    slidesToShow: 1, // 화면에 출력되는 화면 수
    slidesToScroll: 1, // 이동되는 화면 수
    arrows: true, // 양쪽 화살표
    autoplay: true,
    autoplaySpeed: 5000, // 슬라이드 전환 주기 5초마다
    adaptiveHeight: true,
  };
  return (
    <StyledSliderContainer>
      <Slider {...settings}>
        <SlideBox className="first">
          <Container>
            <Box>
              <Item>
                <div>
                  우리 같이 <br />
                  플젝할래?
                </div>
              </Item>
              <Item2>
                <div>
                  mobile버전 다운로드
                  <PlaystoreButton />
                </div>
                <div>
                  두근두근 데이트 시작하기
                  <DatingAppButton onClick={() => navigate("/apueda/datingapp")}>
                    <span>개발자 매칭</span>
                  </DatingAppButton>
                </div>
              </Item2>
            </Box>
            <ImageBox ><Img src={teamicon}/></ImageBox>
          </Container>
        </SlideBox>
        <SlideBox className="second">
          <Container>
            <Box>
              <Item>
                <div>
                  누구든  <br />
                  이지하게
                </div>
              </Item>
              <Item2>
                <div>
                  mobile버전 다운로드
                  <PlaystoreButton />
                </div>
                <div>
                  두근두근 데이트 시작하기
                  <DatingAppButton onClick={() => navigate("/apueda/datingapp")}>
                    <span>개발자 매칭</span>
                  </DatingAppButton>
                </div>
              </Item2>
            </Box>
            <ImageBox ><Img src={alien}/></ImageBox>
          </Container>
        </SlideBox>
        <SlideBox className="third">
          <Container>
            <Box>
              <Item>
                <div>
                  아프다에서 연인찾고 <br />
                  카페에서 야깅하기
                </div>
              </Item>
              <Item2>
                <div>
                  mobile버전 다운로드
                  <PlaystoreButton />
                </div>
                <div>
                  두근두근 데이트 시작하기
                  <DatingAppButton onClick={() => navigate("/apueda/datingapp")}>
                    <span>개발자 매칭</span>
                  </DatingAppButton>
                </div>
              </Item2>
            </Box>
            <ImageBox ><Img src={couple}/></ImageBox>
          </Container>
        </SlideBox>
      </Slider>
    </StyledSliderContainer>
  );
}

const StyledSliderContainer = styled.div`
  .slick-dots {
    bottom: .5vh; // dots 위치를 조정
    li {
      margin: 0 2vw 2vw 0;
    }
    button {
      &::before {
        font-size: 1vw;
        color: black; // dots 색상 조정
      }
    }
    .slick-active button::before {
      color: white; // 활성화된 dots 색상 조정
    }
  }
  @media (max-width:500px){
    .slick-next:before {
      display: none;
    }
    .slick-arrow {
    width: 0;
    height: 0;
      display: none;
      background-color: black;
    }
  }

`;

const SlideBox = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 55vh;

  // 첫 번째 슬라이드 스타일
  &.first {
    background-color: rgb(255, 70, 130);
  }

  // 두 번째 슬라이드 스타일
  &.second {
    background-image: linear-gradient(to top, #11fbc8 0%, #007BCB 100%);
  }

  // 세 번째 슬라이드 스타일
  &.third {
    background-image: linear-gradient(to right, #6a11cb 10%, #2575fc 100%);
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 90svh;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5vw;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  @media (max-width: 500px) {
    align-items: center;
    width: 100%;
    order: 2;
  }
`;
const ImageBox = styled.div`
  width: 50%;
  height: auto;
  box-sizing: border-box;
  @media (max-width: 500px) {
    width: 100%;
    order: 1;
    margin-bottom: 20px;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
const Item = styled.div`
  font-size: 3vw;
  //white-space: nowrap; // 줄바뀜 방지
  color: white;
  margin-bottom: 1vh;
  & > div{margin-top: 2vh}
  @media (max-width: 500px) {
    order: 1;
    & div{
      font-size: 9vw;
    }
  }
`;

const Item2 = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  white-space: nowrap; // 줄바뀜 방지
  margin-bottom: 10px;
  font-size: 1vw;
  color: white;
  & > div {
    display: flex;
    flex-direction: column;
    margin: 10px; // Box의 직계 자식 div에 스타일 적용
  }
  & span {
    font-size: 1.2vw;
    color: rgb(50,50,50);
    text-align: left;
    padding: 1vw;
  }
  @media (max-width: 500px) {
    order: 2;
    flex-direction: column;
    & div{font-size:5vw; align-content: center; };
    & span{font-size:3.5vw};
  }
`;
const PlaystoreButton = styled.div`
  width: 12vw;
  height: 5vh;
  border-radius: 20px;
  background-color: white;
  background-image: url(${googlelogo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 10%;
  cursor: pointer;
  @media (max-width:768px ) {
    width: 30vw;
    height: 3vh;
}
`;
const DatingAppButton = styled.div`
  display: flex;
  align-items: center; // 수직 가운데 정렬
  width: 12vw;
  height: 5vh;
  border-radius: 20px;
  background-color: white;
  background-image: url(${lovechaticon});
  background-size: contain;
  background-position: 96%; // 이미지아이콘 왼쪽기준 위치조정
  background-repeat: no-repeat;
  padding: 10% 0;
  @media (max-width:768px ) {
    width: 30vw;
    height: 3vh;
}
`;
