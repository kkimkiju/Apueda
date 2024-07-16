import styled from "styled-components";
import React from "react";
import Detaillistitem from "./detaillistitem";

const DetaildUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const Detaillist = ({ historyList }) => {
  // const sortedhistoryList = historyList
  //   .slice()
  //   .sort((a, b) => b.paymentHistoryId - a.paymentHistoryId);
  return (
    <DetaildUl>
      {historyList &&
        historyList.map((history) => (
          <Detaillistitem key={history.paymentHistoryId} paymentDt={history} />
        ))}
    </DetaildUl>
  );
};
export default Detaillist;
