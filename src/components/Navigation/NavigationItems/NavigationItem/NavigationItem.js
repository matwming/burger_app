import React from "react";
import styled from "styled-components";
const Li = styled.li`
 margin: 0;
 box-sizing: border-box;
 display: flex;
 height: 100%;
 width: auto;
 align-items: center;
 @media (max-width: 500px) {
  margin: 0;
  width: 100%;
  height: auto;
  display: block;
 }
`;
const A = styled.a`
 color: white;
 text-decoration: none;
 height: 100%;
 padding: 10px 10px;
 border-bottom: 4px solid transparent;
 box-sizing: border-box;
 display: block;
 :hover,
 :active {
  background-color: #8f5c2c;
  border-bottom: 4px solid #40a4c8;
  color: black;
 }
 @media (max-width: 500px) {
  color: #8f5c2c;
  height: auto;
  width: 100%;
  :hover,
  :active {
   color: #40a4c8;
   background-color: white;
   border-bottom: none;
  }
 }
`;
const navigationItem = props => (
 <Li>
  <A href={props.link}>{props.children}</A>
 </Li>
);

export default navigationItem;
