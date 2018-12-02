import React from "react";
import styled from "styled-components";

const Div = styled.div`
 background-color: white;
 padding: 8px;
 height: ${props => props.height || "100 %"};
 box-sizing: border-box;
 border-radius: 5px;
 margin-bottom: 3px;
`;
const Img = styled.img`
 height: 100%;
`;
const logo = props => (
 <Div height={props.height}>
  <Img src="/burger-logo.png" alt="burger" />
 </Div>
);

export default logo;
