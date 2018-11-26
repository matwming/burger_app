import React from "react";
import styled from "styled-components";

const Div = styled.div`
 background-color: white;
 padding: 8px;
 height: 100%;
`;
const Img = styled.img`
 height: 100%;
`;
const logo = props => (
 <Div>
  <Img src="/burger-logo.png" alt="burger" />
 </Div>
);

export default logo;
