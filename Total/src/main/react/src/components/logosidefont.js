import styled from "styled-components";
import logosidefont from "../image/apueda-logo-f.png";

const Logof = styled.div`
  width: 150px;
  height: 100px;
  background-image: url(${logosidefont});
  background-color: none;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Logosidefont = () => {
  return <Logof />;
};
export default Logosidefont;
