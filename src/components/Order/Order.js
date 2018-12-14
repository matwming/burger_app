import React from "react";
import styled from "styled-components";

const Div = styled.div`
 width: 100%;
 border: 1px solid #eee;
 box-shadow: 0 2px 3px #ccc;
 padding: 10px;
 margin: 10px auto;
 box-sizing: border-box;
 :hover {
  transform: scale(1.03);
  animation: all 0.4s;
  border: 1px solid blue;
  padding: 10px;
 }
`;
const order = props => {
 const ingredients = [];
 for (let el in props.ingredients) {
  ingredients.push({ name: el, amount: props.ingredients[el] });
 }
 console.log("ingredients", ingredients);
 return (
  <Div>
   <p>
    Ingredients:
    {ingredients.map(el => {
     return (
      <label
       key={el.name}
       style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px"
       }}
      >
       {el.name} ({el.amount})
      </label>
     );
    })}
   </p>
   <p>
    Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
   </p>
  </Div>
 );
};

export default order;
