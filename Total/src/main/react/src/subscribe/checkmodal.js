// import React from "react";
// import styled from "styled-components";
// import logo from "../image/apueda-logo-ff3e34.png";

// const ModalStyle = styled.div`
//   .modal {
//     display: none;
//     position: fixed;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 99;
//     background-color: rgba(0, 0, 0, 0.6);
//   }

//   .openModal {
//     display: flex;
//     align-items: center;
//     /* 팝업이 열릴때 스르륵 열리는 효과 */
//     animation: modal-bg-show 0.8s;
//   }

//   section {
//     width: 60%;
//     height: 90%;
//     margin: 0 auto;
//     background-color: #fff;
//     animation: modal-show 0.3s;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//     header {
//       text-align: center;
//       color: white;
//       font-size: 20px;
//       align-content: center;
//       background-color: #f92f23;
//       width: 100%;
//       height: 50px;
//     }
//     main {
//       font-size: 25px;
//       display: flex;
//       align-items: center;
//     }
//     label {
//       font-size: 18px;
//       position: absolute;
//       right: 15px;
//     }
//   }

//   @keyframes modal-show {
//     from {
//       opacity: 0;
//       margin-top: -50px;
//     }
//     to {
//       opacity: 1;
//       margin-top: 0;
//     }
//   }
//   @keyframes modal-bg-show {
//     from {
//       opacity: 0;
//     }
//     to {
//       opacity: 1;
//     }
//   }
// `;

// const Butbox = styled.div`
//   width: 100%;
//   text-align: right;
// `;

// const Button = styled.button`
//   outline: none;
//   cursor: pointer;
//   color: white;
//   background-color: #ff5353;
//   font-size: 15px;
//   border: 0;
//   width: 60px;
//   height: 45px;
// `;
// const Logobox = styled.div`
//   width: 85px;
//   height: 85px;
//   background-image: url(${logo});
//   background-size: cover;
//   background-repeat: no-repeat;
//   margin-left: 30px;
//   margin-right: 15px;
// `;

// const CheckModal = (props) => {
//   const { open, header, children, confirm } = props;

//   return (
//     <ModalStyle>
//       <div className={open ? "openModal modal" : "modal"}>
//         {open && (
//           <section>
//             <header>{header}</header>
//             <main>
//               <Logobox />
//               {children}
//             </main>

//             <Butbox>
//               <Button onClick={confirm}>확인</Button>
//             </Butbox>
//           </section>
//         )}
//       </div>
//     </ModalStyle>
//   );
// };
// export default CheckModal;
