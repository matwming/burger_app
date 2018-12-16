import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../config";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
 state = {
  purchasing: false
 };
 componentDidMount() {
  this.props.onInitIngredients();
  this.props.onInitPurchase();
 }
 updatePurchaseState(ingredients) {
  let sum = false;
  if (ingredients) {
   sum = Object.values(ingredients).reduce((a, b) => {
    return a + b;
   }, []);
   console.log("sum", sum);
  }

  return sum > 0;
 }
 addIngredientHandler = type => {
  this.props.onIngredientAdded;
 };
 removeIngredientHandler = type => {
  this.props.onIngredientRemoved;
 };
 purchaseHandler() {
  if (this.props.isAuthenticated) {
   this.setState({
    purchasing: true
   });
  } else {
   this.props.onSetAuthRedirectPath("/checkout");
   this.props.history.push("/auth");
  }
 }
 purchaseCancelHandler = () => {
  this.setState({ purchasing: false });
 };
 purchaseContinueHandler = () => {
  this.props.onInitPurchase();
  this.props.history.push("/checkout");
 };
 render() {
  console.log("purchased_burgerBuilder", this.props.purchased);
  const disabledInfo = {
   ...this.props.ings
  };
  for (let key in disabledInfo) {
   disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = (
   <OrderSummary
    ingredients={this.props.ings}
    purchaseCanceled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}
    price={this.props.price}
   />
  );
  if (this.state.loading) {
   orderSummary = <Spinner />;
  }
  let burger = (
   <Fragment>
    <Burger ingredients={this.props.ings} />
    <BuildControls
     ingredientAdded={this.props.onIngredientAdded}
     ingredientRemoved={this.props.onIngredientRemoved}
     disabled={disabledInfo}
     price={this.props.price}
     purchaseable={this.updatePurchaseState(this.props.ings)}
     ordered={this.purchaseHandler.bind(this)}
     isAuth={this.props.isAuthenticated}
    />
   </Fragment>
  );
  if (!this.props.ings) {
   burger = this.props.error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
   orderSummary = <Spinner />;
  }
  return (
   <Fragment>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
     {orderSummary}
    </Modal>
    {burger}
   </Fragment>
  );
 }
}
const mapStateToProps = state => {
 return {
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  purchased: state.order.purchased,
  isAuthenticated: state.auth.token !== null,
  path: state.auth.authRedirectPath
 };
};

const mapDispatchToProps = dispatch => {
 return {
  onIngredientAdded: name => dispatch(actions.addIngredient(name)),
  onIngredientRemoved: name => dispatch(actions.removeIngredient(name)),
  onInitIngredients: () => dispatch(actions.initIngredient()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(withRouter(ErrorHandler(BurgerBuilder, axios)));
