import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../config";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
const INGREDIENT_PRICES = {
 salad: 0.5,
 cheese: 0.4,
 meat: 1.3,
 bacon: 0.7
};
class BurgerBuilder extends Component {
 state = {
  ingredients: {
   salad: 0,
   bacon: 0,
   cheese: 0,
   meat: 0
  },
  totalPrice: 4,
  purchaseable: false,
  purchasing: false,
  loading: false
 };
 updatePurchaseState(ingredients) {
  const sum = Object.values(ingredients).reduce((a, b) => {
   return a + b;
  }, []);
  console.log("sum", sum);
  this.setState({
   purchaseable: sum > 0
  });
 }
 addIngredientHandler = type => {
  const oldCount = this.state.ingredients[type];
  const updatedCount = oldCount + 1;
  const updatedIngredients = {
   ...this.state.ingredients
  };
  updatedIngredients[type] = updatedCount;
  const priceAddition = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice + priceAddition;
  this.setState({
   totalPrice: newPrice,
   ingredients: updatedIngredients
  });
  this.updatePurchaseState(updatedIngredients);
 };
 removeIngredientHandler = type => {
  const oldCount = this.state.ingredients[type];
  if (oldCount <= 0) {
   return;
  }
  const updatedCount = oldCount - 1;
  const updatedIngredients = {
   ...this.state.ingredients
  };
  updatedIngredients[type] = updatedCount;
  const priceDeduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceDeduction;
  this.setState({
   totalPrice: newPrice,
   ingredients: updatedIngredients
  });
  this.updatePurchaseState(updatedIngredients);
 };
 purchaseHandler() {
  this.setState({
   purchasing: true
  });
 }
 purchaseCancelHandler = () => {
  this.setState({ purchasing: false });
 };
 purchaseContinueHandler = () => {
  this.setState({
   loading: true
  });
  console.log("loading...started");
  let data = {
   ingredients: this.state.ingredients,
   price: this.state.totalPrice,
   customer: {
    name: "ming",
    address: {
     street: "81 hawthorn road",
     postcode: "3131"
    },
    email: "test@test.com"
   }
  };
  axios
   .post("/orders.json", data)
   .then(json => {
    console.log(json);
    if (json.status === 200) {
     this.setState({
      loading: false,
      purchasing: false
     });
    }
   })
   .catch(error => {
    console.log(error);
    this.setState({
     loading: false,
     purchasing: false
    });
   });
 };
 render() {
  console.log("loading_status", this.state.loading);
  const disabledInfo = {
   ...this.state.ingredients
  };
  for (let key in disabledInfo) {
   disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = (
   <OrderSummary
    ingredients={this.state.ingredients}
    purchaseCanceled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}
    price={this.state.totalPrice}
   />
  );
  if (this.state.loading) {
   orderSummary = <Spinner />;
  }

  return (
   <Fragment>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
     {orderSummary}
    </Modal>
    <Burger ingredients={this.state.ingredients} />
    <BuildControls
     ingredientAdded={this.addIngredientHandler}
     ingredientRemoved={this.removeIngredientHandler}
     disabled={disabledInfo}
     price={this.state.totalPrice}
     purchaseable={this.state.purchaseable}
     ordered={this.purchaseHandler.bind(this)}
    />
   </Fragment>
  );
 }
}

export default ErrorHandler(BurgerBuilder, axios);
