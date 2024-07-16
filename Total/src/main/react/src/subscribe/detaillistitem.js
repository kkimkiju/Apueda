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
  margin: 0px 22% 9px 9%;
  text-align: center;
  @media (max-width: 500px) {
    margin-right: 5%;
    width: 16%;
  }
`;
const DetTitle = styled.h3`
  width: 230px;
  color: black;
  margin: 0px 29% 0px 0%;
  @media (max-width: 500px) {
    margin-right: 17%;
  }
`;
const Detamo = styled.p`
  color: #444;
  font-size: 13px;
  text-align: center;
`;
const Detdate = styled.p`
  color: #777;
  font-size: 13px;
  text-align: center;
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
