import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import styled from "styled-components";
const Burger = styled.div`
 width: 100%;
 margin: auto;
 height: 250px;
 overflow: scroll;
 text-align: center;
 font-weight: bold;
 font-size: 1.2rem;
 @media (min-width: 1000px) and (min-height: 700px) {
  width: 700px;
  height: 600px;
 }
 @media (min-width: 500px) and (min-height: 401px) {
  width: 450px;
  height: 400px;
 }
 @media (min-width: 500px) and (max-height: 400px) {
  width: 350px;
  height: 300px;
 }
`;
const burger = props => {
 const transformedIngredients = Object.keys(props.ingredients).map(ingredient => {
  return [...Array(props.ingredients[ingredient])].map((el, i) => {
   return <BurgerIngredient key={ingredient + i} type={ingredient} />;
  });
 });
 const ingredientNumber = Object.values(props.ingredients).reduce((a, b) => {
  return a + b;
 });

 return (
  <Burger>
   <BurgerIngredient type="bread-top" />
   {ingredientNumber === 0 ? "Please start to add ingredients" : transformedIngredients}
   <BurgerIngredient type="bread-bottom" />
   <button>sdfs</button>
  </Burger>
 );
};

export default burger;
