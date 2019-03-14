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

class ContactData extends Component {
 state = {
  formIsValid: false,
  orderForm: {
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
  }
 };
 checkValidity(value, rules) {
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
 }
 componentDidUpdate() {
  if (this.props.purchased) {
   this.props.history.replace("/");
  }
 }
 orderHandler = event => {
  event.preventDefault();
  console.log("loading...started");
  //
  const formData = {};
  for (let el in this.state.orderForm) {
   formData[el] = this.state.orderForm[el].value;
  }
  //
  let data = {
   ingredients: this.props.ings,
   price: this.props.price,
   userId: this.props.userId,
   orderData: formData
  };

  let token = localStorage.getItem("token");
  this.props.onOrderBurger(data, token);
 };
 inputChangedHandler = (event, el) => {
  console.log(event.target.value, el);
  const updatedOrderForm = {
   ...this.state.orderForm
  };
  const updatedFormElement = { ...updatedOrderForm[el] };
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(
   updatedFormElement.value,
   updatedFormElement.validation
  );
  updatedFormElement.touched = true;
  console.log(updatedFormElement);
  updatedOrderForm[el] = updatedFormElement;
  let formIsValid = true;
  for (let el in updatedOrderForm) {
   formIsValid = updatedOrderForm[el].valid && formIsValid;
  }
  this.setState({
   orderForm: updatedOrderForm,
   formIsValid: formIsValid
  });
 };
 render() {
  let form = (
   <form style={{ margin: "0 auto" }}>
    {Object.keys(this.state.orderForm).map(el => {
     return (
      <Input
       elementType={this.state.orderForm[el].elementType}
       elementConfig={this.state.orderForm[el].elementConfig}
       value={this.state.orderForm[el].value}
       key={el}
       shouldValidate={this.state.orderForm[el].validation}
       invalid={!this.state.orderForm[el].valid}
       changed={event => this.inputChangedHandler(event, el)}
       touched={this.state.orderForm[el].touched}
       labelName={el}
      />
     );
    })}
    <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>
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
