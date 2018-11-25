import React from "react";
import styled from "styled-components";
import BuildControl from "./BuildControl/BuildControl";
import OrderButton from "./ButtonControlsStyles";
const BuildControls = styled.div`
 width: 100%;
 background-color: #cf8f2e;
 display: flex;
 flex-flow: column;
 align-items: center;
 box-shadow: 0 2px 1px #ccc;
 margin: auto;
 padding: 10px 0;
`;
const controls = [
 { label: "Salad", type: "salad" },
 { label: "Bacon", type: "bacon" },
 { label: "Cheese", type: "cheese" },
 { label: "Meat", type: "meat" }
];

const buildControl = props => (
 <BuildControls>
  <p>
   Current Price: <strong>{props.price.toFixed(2)}</strong>
  </p>
  {controls.map(el => {
   return (
    <BuildControl
     key={el.label}
     label={el.label}
     added={() => props.ingredientAdded(el.type)}
     removed={() => props.ingredientRemoved(el.type)}
     disabled={props.disabled[el.type]}
    />
   );
  })}
  <OrderButton disabled={!props.purchaseable} onClick={props.ordered}>
   ORDER NOW
  </OrderButton>
 </BuildControls>
);

export default buildControl;
