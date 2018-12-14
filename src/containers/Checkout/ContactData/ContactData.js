import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styled from "styled-components";
import axios from "../../../config";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
const Input = styled.input`
 display: block;
`;
class ContactData extends Component {
 state = {
  name: "",
  email: "",
  address: {
   street: "",
   postalCode: ""
  }
 };

 orderHandler = event => {
  event.preventDefault();
  this.setState({
   loading: true
  });
  console.log("loading...started");
  let data = {
   ingredients: this.props.ings,
   price: this.props.price,
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
      loading: false
     });
     this.props.history.replace("/");
    }
   })
   .catch(error => {
    console.log(error);
    this.setState({
     loading: false
    });
   });
 };
 render() {
  let form = (
   <form style={{ margin: "0 auto" }}>
    <Input type="text" name="name" placeholder="your name" />
    <Input type="email" name="email" placeholder="your Mail" />
    <Input type="text" name="street" placeholder="your street" />
    <Input type="text" name="postal" placeholder="your postal" />
    <Button btnType="Success" clicked={this.orderHandler}>
     Order
    </Button>
   </form>
  );
  if (this.state.loading) {
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
  ings: state.ingredients,
  price: state.totalPrice
 };
};
export default connect(
 mapStateToProps,
 null
)(withRouter(ContactData));
