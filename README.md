💬 프로젝트 구인 게시판 프로젝트
---

### 🎯 목적
__내가 원하고 나를 원하는 프로젝트 멤버를 찾기 위한 페이지__

<br>

### 👥 멤버구성
|<img src="https://avatars.githubusercontent.com/u/161571071?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/74034344?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/161570977?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/49334905?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/161571071?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|:-:|:-:|
|김기주<br/>[@qarksangwon](https://github.com/kkimkiju)|강인구<br/>[@dzface](https://github.com/dzface)|김동환<br/>[@kimfjd](https://github.com/kimfjd)|김세호<br/>[@tpgh1554](https://github.com/tpgh1554)|임정후<br/>[@limfarmer](https://github.com/limfarmer)|

  - 박상원 (qarksangwon) : 채팅방, ID/PW찾기 일부, 메일인증 일부, 정보 수정 일부, 프로필 사진 CRUD 일부
  - 김기주 (kkimkiju) : 게시판 CRUD, 회원 관리 시스템 프로필 사진 firebase 연동
  - 백승재 (BaekSeoungJae) : 회원가입, 로그인, ID, 비밀번호 찾기, 정보 수정, 관리자 
  - 김현근 (hyunkk1) :  회원가입, 로그인, ID, 비밀번호 찾기, 정보 수정, 관리자
<br><br>
---

### 📌주요 기능
__회원 관리 시스템__ - 로그인/ 회원가입 (메일 인증) / 아이디 찾기/ 비밀번호 찾기/ 회원 탈퇴/ 정보 수정/ 관리자 계정

__채팅 시스템__ - 채팅방 생성/삭제/입장 및 내부에서 WebSocket 실시간 통신 및 Canvas 이용한 그림 그리기 기능

__게시판__ - 게시글 작성 및 조회, 검색, 삭제

<br>

### 🔧 개발 환경
__프론트엔드__ - `HTML`, `CSS`, `JavaScript`, `React`

__백엔드__ - `SpringBoot(2.7)` , `Firebase`

__데이터베이스__ - `oracle`

__형상 관리__ - `git` , `notion`

__개발 환경__ - `IntelliJ`, `VSCode`

---

### 📜요구사항 
![image](https://github.com/qarksangwon/AskMe/assets/113305463/92d06d6b-01ed-405c-a2e6-d20d626d9681)

---

### 메뉴트리
😊 __메뉴트리__ 
![image](https://github.com/qarksangwon/AskMe/assets/113305463/32e6ae1d-48c0-4604-bb00-976373ec1090)

요구 사항에 맞춰 페이지 구성

__💡특이사항__
  - 회원가입 시 __메일 인증__ 을 통해 회원가입을 해야한다

  -  ID/PW 찾을 시에도 __메일 인증__ 을 통해 찾을 수 있다.

  -  프로필 이미지는 __Firebase__ 를 통해 관리하여 사용자가 프로필 사진을 등록할 수 있다.

  - 사용자가 접속해서 __시스템을 이용할 때, 로그인이 필수이다.__  

  - __채팅방은 계정 하나당 하나의 채팅방을 생성할 수 있다__, 채팅방은 반드시 채팅방 번호로 입장할 수 있으며 입장 시 WebSocket을 이용한 실시간 채팅이 가능하다.

  - __게시글 4개 단위로 페이지를 구성__ 했으며 __게시물에서 채팅방으로 바로 입장__ 가능하도록 구현. 자신이 작성한 게시물은 바로 삭제가 가능하다. 또한 게시글 제목으로 검색이 가능하다.

  - __관리자 계정__ 은 모든 게시글과 채팅방을 관리하여 CRUD 작업이 가능하다.



---

### ERD 
![image](https://github.com/qarksangwon/AskMe/assets/113305463/6ccbd005-419d-4399-91a1-fd93910ed3c9)


---

### 🎨실제 구현 
_모바일 동일 : 페이지 구성은 같은데 사이즈만 줄인 것_

- __메인페이지__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/8f4775c3-a33c-4885-9e6f-5aa5dab9c28c)

<br>

- __모바일__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/63221c57-9a17-4281-bddb-0ba87e13a940)

<br>

- __로그인/ID,PW찾기(모바일 동일)__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/4f2d8cc4-f530-45dd-8f76-5b68dc1a7cce)

<br>

- __회원가입(모바일 동일)__
  
![image](https://github.com/qarksangwon/AskMe/assets/113305463/1b0cff0c-8b58-457d-b186-cd8b38e2f276)

<br>

- __마이페이지(모바일 동일)__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/266ad9db-9293-4a25-a296-f02a9892103a)

<br>

- __정보 수정(모바일 동일)__
  
![image](https://github.com/qarksangwon/AskMe/assets/113305463/e92e1968-1eb4-4d6c-a17c-01aeede6bc4f)  ![image](https://github.com/qarksangwon/AskMe/assets/113305463/d765950d-c017-40fd-9c22-d3e98c385d73)


<br>

- __게시판__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/5aa65c8a-5362-40cf-8130-8b3a8500e970)


<br>

- __모바일__
  
![image](https://github.com/qarksangwon/AskMe/assets/113305463/76fe859e-b269-4a2f-994a-4b2c13844d7b)

<br>

- __글 작성(모바일 동일)__
  
![image](https://github.com/qarksangwon/AskMe/assets/113305463/62e297d8-da2a-437c-8b2d-bb18e1b60dd8)

<br>

- __게시글(모바일 동일)__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/871174ce-d5e5-4519-b4ce-1eddf4e48a18)

<br>

- __채팅방 메인__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/50724f4b-9d4e-4d61-a5af-dd9a397a4ccd)


<br>

- __채팅방 모바일__
  
![image](https://github.com/qarksangwon/AskMe/assets/113305463/cee4dc9c-852c-424c-8266-84f5a3f07746)

<br>

- __관리자 접속__
![image](https://github.com/qarksangwon/AskMe/assets/113305463/a92b7374-1929-4db4-860f-74b0652dc363)

<br>

![image](https://github.com/qarksangwon/AskMe/assets/113305463/fbfa4d58-e156-4f8f-b8ad-0ddee92613c5)

<br>

![image](https://github.com/qarksangwon/AskMe/assets/113305463/94b15398-2b1c-4f84-9a2b-84b395480dae)

<br>


---
### 🙈아쉬운 점 ###
먼저, React와 Restful 방식으로 Backend (Springboot)와 통합 개발을 해 보았는데 __구현 범위가 너무 적었던 것__ 이 제일 아쉽다. 
<br>
채팅 시스템의 Canvas까지 실시간 통신으로 만들 수 있었으면 하는 아쉬움이 남았지만, <br>
__WebSocket 방식으로 실시간 채팅을 구현해보고__, Front와 Back을 __Restful__ 하게 구현해 보았다는 것이 좋은 경험이 되었다.

---

___협업 때 사용했던 Notion 입니다. 프로젝트 진행 과정과 발표 자료가 담겨져 있습니다.___

  <a href="https://www.notion.so/sangdolstudy/ASKME-0def579f2e314c96a7daf867d7866038">
    <img src="https://img.shields.io/badge/TeamProject-A374DB?style=for-the-badge&logo=notion&logoColor=#ECD53F">
  </a>
