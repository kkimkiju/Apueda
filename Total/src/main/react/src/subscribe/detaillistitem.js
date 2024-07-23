import styled from "styled-components";

const DetLi = styled.li`
  background-color: none;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ced4da;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;
const TiContain = styled.div`
  align-items: center;
  margin: 0px 20% 9px 9%;
  text-align: center;
  @media (max-width: 500px) {
    margin-right: 5%;
    width: 16%;
  }
  @media (max-width: 429px) {
    margin: 0;
    width: 33%;
  }
`;
const DetTitle = styled.h3`
  width: 230px;
  color: black;
  margin: 0px 27% 0px 0%;
  @media (max-width: 500px) {
    margin-right: 17%;
  }
  @media (max-width: 429px) {
    margin-right: 14%;
    font-size: 17px;
  }
`;
const Detamo = styled.p`
  color: #444;
  font-size: 13px;
  text-align: center;
  @media (max-width: 429px) {
    width: 13%;
  }
`;
const Detdate = styled.p`
  color: #777;
  font-size: 13px;
  text-align: center;
  @media (max-width: 429px) {
    font-size: 11px;
  }
`;
const Detaillistitem = ({ paymentDt }) => {
  const formattedDate = paymentDt.paymentDate.substring(0, 10);
  return (
    <DetLi>
      <TiContain>
        <Detdate>{formattedDate}</Detdate>
      </TiContain>
      <DetTitle>{paymentDt.name}</DetTitle>
      <Detamo>{paymentDt.amount}</Detamo>
    </DetLi>
  );
};
export default Detaillistitem;
