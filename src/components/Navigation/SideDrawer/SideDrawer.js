import React, { Fragment } from "react";
import styled, { keyframes } from "styled-components";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
const Div = styled.div`
 position: fixed;
 width: 200px;
 max-width: 70%;
 height: 100%;
 left: 0;
 top: 0;
 z-index: 200;
 background-color: white;
 padding: 32px 16px;
 box-sizing: border-box;
 transition: transform 3s ease-out;
 @media (min-width: 500px) {
  display: none;
 }
`;

const sideDrawer = props => {
 console.log("props.show", props.open);
 return (
  <Fragment>
   <Backdrop show={props.open} clicked={props.closed} />
   <Div style={{ visibility: props.open === true ? "block" : "hidden" }}>
    <Logo height="11%" />
    <nav>
     <NavigationItems />
    </nav>
   </Div>
  </Fragment>
 );
};

export default sideDrawer;
