import React from "react";
import styled from "styled-components";
const OuterDiv = styled.div`
 width: 40px;
 height: 100%;
 display: flex;
 flex-flow: column;
 justify-content: space-around;
 align-items: center;
 padding: 10px 0;
 box-sizing: border-box;
 cursor: pointer;
 @media (min-width) {
  display: none;
 }
`;
const InnerDiv = styled.div`
 width: 90%;
 height: 3px;
 background-color: white;
`;
const drawerToggler = props => (
 <OuterDiv onClick={props.clicked} style={{ cursor: "pointer" }}>
  <InnerDiv />
  <InnerDiv />
  <InnerDiv />
 </OuterDiv>
);

export default drawerToggler;
