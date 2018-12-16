import React from "react";
import styled from "styled-components";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import { withRouter } from "react-router-dom";
const Div = styled.div`
 text-align: center;
 width: 80%;
 margin: auto;
`;
const checkoutSummary = props => {
 return (
  <Div>
   <h1>We hope it tastes well!</h1>
   <div style={{ width: "100%", margin: "auto" }}>
    <Burger ingredients={props.ingredients} />
   </div>

   <Button clicked={props.checkoutCancelled}>Cancel</Button>
   <Button btnType="success" clicked={props.checkoutContinued}>
    Continue
   </Button>
  </Div>
 );
};

export default withRouter(checkoutSummary);
