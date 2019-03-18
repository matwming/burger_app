import React, { useState, useEffect } from "react";
import Button from "../../../components/UI/Button/Button";
import styled from "styled-components";
import axios from "../../../config";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ErrorHandler from "../../ErrorHandler/ErrorHandler";
import * as actions from "../../../store/actions/index";
import Input from "../../../components/UI/Input/Input";
import uuid from "uuid";
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

const contactData = props => {
 const [formIsValid, setFormIsValid] = useState(false);
 const [orderForm, setOrderForm] = useState({
  name: {
   elementType: "input",
   elementConfig: {
    type: "text",
    placeholder: "Your Name"
   },
   value: "",
   validation: {
    required: true
   },
   valid: false,
   touched: false
  },
  street: {
   elementType: "input",
   elementConfig: {
    type: "text",
    placeholder: "Street"
   },
   value: "",
   validation: {
    required: true
   },
   valid: false,
   touched: false
  },
  postcode: {
   elementType: "input",
   elementConfig: {
    type: "text",
    placeholder: "postcode"
   },
   value: "",
   validation: {
    required: true,
    minLength: 5,
    maxLength: 5
   },
   valid: false,
   touched: false
  },
  country: {
   elementType: "input",
   elementConfig: {
    type: "text",
    placeholder: "Country"
   },
   value: "",
   validation: {
    required: true
   },
   valid: false,
   touched: false
  },
  email: {
   elementType: "input",
   elementConfig: {
    type: "email",
    placeholder: "email"
   },
   value: "",
   validation: {
    required: true
   },
   valid: false,
   touched: false
  },
  deliveryMethod: {
   elementType: "select",
   elementConfig: {
    options: [
     {
      value: "fastest",
      label: "Fastest"
     },
     {
      value: "cheapest",
      label: "Cheapest"
     }
    ]
   },
   value: "",
   valid: true,
   validation: {}
  }
 });

 const checkValidity = (value, rules) => {
  let isValid = true;
  if (rules.required) {
   isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
   isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
   isValid = value.length <= rules.maxLength && isValid;
  }
  return isValid;
 };
 useEffect(() => {
  if (props.purchased) {
   props.history.replace("/");
  }
 });
 const orderHandler = event => {
  event.preventDefault();
  console.log("loading...started");

  //传递form数据
  const formData = {};
  for (let el in orderForm) {
   formData[el] = orderForm[el].value;
  }
  //

  let data = {
   ingredients: props.ings,
   price: props.price,
   userId: props.userId,
   orderData: formData
  };

  let token = localStorage.getItem("token");
  props.onOrderBurger(data, token);
 };
 const inputChangedHandler = (event, el) => {
  console.log(event.target.value, el);
  const updatedOrderForm = {
   ...orderForm
  };
  const updatedFormElement = { ...updatedOrderForm[el] };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
  updatedFormElement.touched = true;
  console.log(updatedFormElement);
  updatedOrderForm[el] = updatedFormElement;
  let formIsValid = true;
  for (let el in updatedOrderForm) {
   formIsValid = updatedOrderForm[el].valid && formIsValid;
  }
  setOrderForm(updatedOrderForm);
  setFormIsValid(formIsValid);
 };

 let form = (
  <form style={{ margin: "0 auto" }}>
   {Object.keys(orderForm).map(el => {
    return (
     <Input
      elementType={orderForm[el].elementType}
      elementConfig={orderForm[el].elementConfig}
      value={orderForm[el].value}
      key={el}
      shouldValidate={orderForm[el].validation}
      invalid={!orderForm[el].valid}
      changed={event => inputChangedHandler(event, el)}
      touched={orderForm[el].touched}
      labelName={el}
     />
    );
   })}
   <Button btnType="Success" clicked={orderHandler} disabled={!formIsValid}>
    Order
   </Button>
  </form>
 );
 if (props.loading) {
  form = <Spinner />;
 }

 return (
  <Div>
   <h4>Enter your Contact Data</h4>
   {form}
  </Div>
 );
};
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
)(withRouter(ErrorHandler(contactData, axios)));
