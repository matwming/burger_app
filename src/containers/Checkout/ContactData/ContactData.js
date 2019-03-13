import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styled from "styled-components";
import axios from "../../../config";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import * as actions from "../../../store/actions/index";
import Input from "../../../components/UI/Input/Input";
const Div = styled.div`
 margin: 20px auto;
 width: 80%;
 text-align: center;
 box-shadow: 0 2px 3px #ccc;
 border: 1px solid #eee;
 padding: 10px;
 box-sizing: border-box;
 @media (min-width: 600px) {
  width: 500px;
 }
`;

class ContactData extends Component {
 state = {
  orderForm: {
   customer: {
    name: {
     elementType: "input",
     elementConfig: {
      type: "text",
      placeholder: "Your Name"
     }
    },
    street: "81 hawthorn road",
    postcode: "3131",
    email: "test@test.com",
    deliveryMethod: "fastest"
   }
  }
 };
 componentDidUpdate() {
  if (this.props.purchased) {
   this.props.history.replace("/");
  }
 }
 orderHandler = event => {
  event.preventDefault();
  console.log("loading...started");
  let data = {
   ingredients: this.props.ings,
   price: this.props.price,
   userId: this.props.userId,
   customer: {
    name: "ming",
    address: {
     street: "81 hawthorn road",
     postcode: "3131"
    },
    email: "test@test.com"
   }
  };
  let token = localStorage.getItem("token");
  this.props.onOrderBurger(data, token);
 };
 render() {
  console.log("contactData");
  let form = (
   <form style={{ margin: "0 auto" }}>
    <Input inputtype="input" type="text" name="name" placeholder="your name" />
    <Input inputtype="input" type="email" name="email" placeholder="your Mail" />
    <Input inputtype="input" type="text" name="street" placeholder="your street" />
    <Input inputtype="input" type="text" name="postal" placeholder="your postal" />
    <Input inputtype="textarea" placeholder="Please leave your notes or special requests" />
    <Button btnType="Success" clicked={this.orderHandler}>
     Order
    </Button>
   </form>
  );
  if (this.props.loading) {
   form = <Spinner />;
  }

  return (
   <Div>
    <h4>Enter your Contact Data</h4>
    {form}
   </Div>
  );
 }
}
const mapStateToProps = state => {
 return {
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  purchased: state.order.purchased,
  token: state.auth.token,
  userId: state.auth.userId
 };
};
const mapDispatchToProps = dispatch => {
 return {
  onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(withRouter(ErrorHandler(ContactData, axios)));
