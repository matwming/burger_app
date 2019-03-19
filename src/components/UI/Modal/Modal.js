import React, { Fragment, Component } from "react";
import styled from "styled-components";
import Backdrop from "../Backdrop/Backdrop";

const MyModal = styled.div`
 position: fixed;
 z-index: 500;
 background-color: white;
 width: 70%;
 border: 1px solid #ccc;
 box-shadow: 1px 1px 1px black;
 padding: 16px;
 left: 15%;
 top: 30%;
 box-sizing: border-box;
 transition: all 0.3s ease-out;
 @media (min-width: 600px) {
  width: 500px;
  left: calc(50% - 250px);
 }
`;
const model = props => {
 //  shouldComponentUpdate(nextProps, nextState) {
 //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
 //  }

 return (
  <Fragment>
   <Backdrop show={props.show} clicked={props.modalClosed} />
   <MyModal
    style={{
     transform: props.show ? "translateY(0)" : "translateY(-100vh)",
     opacity: props.show ? "1" : "0"
    }}
   >
    {props.children}
   </MyModal>
  </Fragment>
 );
};

export default React.memo(
 model,
 (prevProps, nextProps) =>
  nextProps.show === prevProps.show && nextProps.children === prevProps.children
);
