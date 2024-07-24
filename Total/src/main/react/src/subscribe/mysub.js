import styled from "styled-components";
import Apuedalogo from "../image/apueda-logo-ff3e34.png";
import PaymentApi from "../api/PaymentAxios";
import AxiosApi from "../api/AxiosApi";
import Detaillist from "./detailllist";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paging from "./paging";
import Resubmodal from "./resubmodal";
import Unsubmodal from "./unsubmodal";

const Subpage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  /* overflow: scroll; */
`;

const Subinfobox = styled.div`
  width: 65%;
  background-color: white;
  border: 1px solid #dee2e6;
  margin-top: 10vh;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Logoimg = styled.div`
  width: 15%;
  height: 50px;
  background-image: url(${Apuedalogo});
  background-color: none;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 8%;
`;
const Deadline = styled.div`
  width: 35%;
  height: 50px;
  text-align: center;
  align-content: center;
  font-size: 25px;
  margin-left: 12%;
  @media (max-width: 500px) {
    width: 33%;
    font-size: 15px;
  }
  @media (max-width: 429px) {
    width: 55%;
    font-size: 13px;
  }
`;

const Subbutt = styled.button`
  width: 100px;
  height: 30px;
  color: white;
  background-color: #ff5353;
  border-radius: 30px;
  font-size: 20px;
  text-align: center;
  align-content: center;
  margin-left: 12%;
  border: 0;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 429px) {
    font-size: 15px;
  }
`;

const Datails = styled.div`
  width: 150px;
  height: 50px;
  color: white;
  background-color: #ff5353;
  border-radius: 30px;
  font-size: 20px;
  text-align: center;
  align-content: center;
  margin-top: 10%;
  @media (max-width: 500px) {
    width: 100%;
    border-radius: 0;
    text-align: left;
    color: black;
    background-color: w;
  }
`;

const Datailsbox = styled.div`
  margin-top: 50px;
  width: 65%;
  background-color: red;
  height: 700px;
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 100%;
    height: 410px;
    margin-top: 30px;
  }
`;

const Detailtitle = styled.div`
  width: 100%;
  background-color: #dee2e6;
  height: 60px;
  color: black;
  display: flex;
  align-items: center;
`;
const Textbox = styled.div`
  font-size: 23px;
  color: black;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 17px;
  }
  @media (max-width: 429px) {
    font-size: 13px;
  }
`;
const Detailbox = styled.div`
  height: 640px;
  width: 100%;
  background-color: white;
`;
const Mysub = () => {
  const [historyList, setHistoryList] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = async () => {
      try {
        const rsp = await AxiosApi.getUserInfo2();
        setEmail(rsp.data.email);
      } catch (e) {
        console.log(e);
      }
    };
    userEmail();
  }, []);

  const [deadLine, setDeadLine] = useState("");
  const [substatus, setSubstatus] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [subOpen, setSubOpen] = useState(false);
  const [resubOpen, setResubOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [resubmodalOpen, setResubmodalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [header, setHeader] = useState("");
  const [merchantuid, setMerchantuid] = useState("");
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const onClickSub = (e) => {
    setSubOpen(true);
  };
  const closeSub = () => {
    setSubOpen(false);
  };

  const onClickreSub = (e) => {
    setResubOpen(true);
  };
  const closereSub = () => {
    setResubOpen(false);
  };

  useEffect(() => {
    if (email) {
      fetchData();
      fetchDeadline();
    }
  }, [email, currentPage]);

  const fetchData = async () => {
    try {
      let response = await PaymentApi.historyList(
        email,
        currentPage - 1,
        pageSize
      );
      console.log("res : ", response);
      setTotalItems(response.data.totalItems); // totalItems 설정
      setHistoryList(response.data.paymentHistory);
      console.log("historyList : ", historyList);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const fetchDeadline = async () => {
    try {
      let response = await PaymentApi.deadline(email);
      if (response && response.data) {
        setDeadLine(response.data[0].validUntil);
        setSubstatus(response.data[0].status);
        setMerchantuid(response.data[0].merchantuid);
        console.log(response.data[0]);
      } else {
        setSubstatus(null);
        console.error("No deadline data in response");
      }
    } catch (error) {
      console.error("Error fetching deadline:", error);
    }
  };

  const handleSubscriptionAction = () => {
    if (substatus === "구독" && new Date(deadLine) > new Date()) {
      return "해지";
    } else if (substatus === "해지" && new Date(deadLine) > new Date()) {
      return "재구독";
    } else {
      return "구독";
    }
  };
  const subnav = () => {
    if (substatus === "구독" && new Date(deadLine) > new Date()) {
      onClickSub();
    } else if (substatus === "해지" && new Date(deadLine) > new Date()) {
      onClickreSub();
    } else {
      navigate("/apueda/subinfo");
    }
  };
  // const paginatedData = historyList.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const buttonText = handleSubscriptionAction();

  // const deline = deadLine.substring(0, 10);

  return (
    <Subpage>
      <Subinfobox>
        <Logoimg />
        <Deadline>{deadLine}</Deadline>
        <Subbutt onClick={subnav}>{buttonText}</Subbutt>
      </Subinfobox>
      <Datails>결제내역</Datails>
      <Datailsbox>
        <Detailtitle>
          <Textbox style={{ marginLeft: "10%" }}>결제일</Textbox>
          <Textbox style={{ margin: "0 35% 0 30%" }}>내역</Textbox>
          <Textbox>금액</Textbox>
        </Detailtitle>
        <Detailbox>
          <Detaillist historyList={historyList} />
        </Detailbox>
      </Datailsbox>
      <Paging
        page={currentPage}
        itemsCountPerPage={pageSize}
        totalItemsCount={totalItems}
        onPageChange={handlePageChange}
      />
      <Unsubmodal
        open={subOpen}
        close={closeSub}
        category="해지 창"
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
        setHeader={setHeader}
        deadLine={deadLine}
        merchantuid={merchantuid}
        member={email}
      />
      <Resubmodal
        open={resubOpen}
        close={closereSub}
        category="재구독 창"
        setModalOpen={setResubmodalOpen}
        merchantuid={merchantuid}
        deadLine={deadLine}
      />
    </Subpage>
  );
};

export default Mysub;
