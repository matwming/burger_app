import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import styled from "styled-components";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const Input = styled.input`
 display: block;
 margin: 10px auto;
 padding: 0.5rem;
 width: 60%;
 border: 1px solid lightgray;
`;
const Div = styled.div`
 margin: 20px auto;
 width: 80%;
 text-align: center;
 box-shadow: 0 2px 3px #ccc;
 padding: 10px;
 box-sizing: border-box;
 :hover {
  border: 1px solid yellow;
 }
`;
class Auth extends Component {
 state = {
  isSignUp: true,
  username: "",
  password: "",
  controls: {
   email: {
    elementType: "input",
    elementConfig: {
     type: "email",
     placeholder: "Mail Address"
    },
    value: "",
    validation: {
     required: true,
     isEmail: true
    },
    valid: false,
    touched: false
   },
   password: {
    elementType: "input",
    elementConfig: {
     type: "password",
     placeholder: "Password"
    },
    value: "",
    validation: {
     required: true,
     minLength: 6
    },
    valid: false,
    touched: false
   }
  }
 };
 onChange(key, e) {
  this.setState({
   [key]: e.target.value
  });
 }
 onSubmitHandler(event) {
  event.preventDefault();
  console.log("clicked");
  let email = this.state.username;
  let password = this.state.password;
  let isSignUp = this.state.isSignUp;
  this.props.onAuth(email, password, isSignUp);
 }
 switchAuthModeHandler = event => {
  event.preventDefault();
  this.setState(prevState => {
   return { isSignUp: !prevState.isSignUp };
  });
 };
 render() {
  const formElementArray = [];
  for (let key in this.state.orderForm) {
   formElementArray.push({
    id: key,
    config: this.state.orderForm[key]
   });
  }

  return (
   <Div>
    <form>
     <Input
      placeholder="your email"
      value={this.state.username}
      onChange={this.onChange.bind(this, "username")}
     />
     <Input
      type="password"
      placeholder="your password"
      value={this.state.password}
      onChange={this.onChange.bind(this, "password")}
     />
     <Button btnType="success" clicked={this.onSubmitHandler.bind(this)}>
      Submit
     </Button>
     <Button clicked={this.switchAuthModeHandler}>
      Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}
     </Button>
    </form>
   </Div>
  );
 }
}

const mapDispatchToProps = dispatch => {
 return {
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
 };
};
export default connect(
 null,
 mapDispatchToProps
)(Auth);
