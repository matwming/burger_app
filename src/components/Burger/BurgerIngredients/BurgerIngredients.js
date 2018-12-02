import React, { Component } from "react";
import {
 BreadBottom,
 BreadTop,
 Seed1,
 Seed2,
 Cheese,
 Bacon,
 Meat,
 Salad
} from "./BurgerIngredientStyles";
import PropTypes from "prop-types";

class BurgerIngredient extends Component {
 render() {
  let ingredient = null;
  switch (this.props.type) {
   case "bread-bottom":
    ingredient = <BreadBottom />;
    break;
   case "bread-top":
    ingredient = (
     <BreadTop>
      <Seed1 />
      <Seed2 />
     </BreadTop>
    );
    break;
   case "meat":
    ingredient = <Meat />;
    break;
   case "cheese":
    ingredient = <Cheese />;
    break;
   case "bacon":
    ingredient = <Bacon />;
    break;
   case "salad":
    ingredient = <Salad />;
    break;
   default:
    ingredient = null;
  }
  return ingredient;
 }
}
BurgerIngredient.propTypes = {
 type: PropTypes.string.isRequired
};
export default BurgerIngredient;
