import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import styled from "styled-components";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import { checkValidity, updateObject } from "../../shared/utility";
import Input from "../../components/UI/Input/Input";
const Div = styled.div`
 margin: 20px auto;
 width: 60%;
 text-align: center;
 box-shadow: 0 2px 3px #ccc;
 padding: 10px;
 box-sizing: border-box;
 :hover {
  border: 1px solid black;
 }
`;
const auth = props => {
 const [isSignUp, setIsSignUp] = useState(true);
 const [authForm, setAuthForm] = useState({
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
 });

 const inputChangedHandler = (event, controlName) => {
  console.log("onChanged");
  const updatedControls = updateObject(authForm, {
   [controlName]: updateObject(authForm[controlName], {
    value: event.target.value,
    valid: checkValidity(event.target.value, authForm[controlName].validation),
    touched: true
   })
  });
  setAuthForm(updatedControls);
 };
 const onSubmitHandler = event => {
  event.preventDefault();
  let email = authForm.email.value;
  let password = authForm.password.value;
  let isSignUp = isSignUp;
  props.onAuth(email, password, isSignUp);
 };
 const switchAuthModeHandler = event => {
  event.preventDefault();
  setIsSignUp(!isSignUp);
 };
 useEffect(() => {
  if (!props.building && props.authRedirectPath !== "/") {
   props.onSetAuthRedirectPath("/");
  }
 }, []);
 useEffect(() => {
  if (props.isAuthenticated && props.building) {
   props.history.push({
    pathname: props.authRedirectPath
   });
  } else if (props.isAuthenticated && props.building === false) {
   props.history.push({
    pathname: "/"
   });
  }
 });

 const formElementArray = [];
 for (let key in authForm) {
  formElementArray.push({
   id: key,
   config: authForm[key]
  });
 }
 console.log("formElementArray", formElementArray);
 let form = formElementArray.map(formElement => (
  <Input
   key={formElement.id}
   elementType={formElement.config.elementType}
   elementConfig={formElement.config.elementConfig}
   value={formElement.config.value}
   invalid={!formElement.config.valid}
   shouldValidate={formElement.config.validation}
   touched={formElement.config.touched}
   changed={event => inputChangedHandler(event, formElement.id)}
  />
 ));

 if (props.loading) {
  form = <Spinner />;
 }
 let errorMessage = null;
 if (props.error) {
  errorMessage = <p>{props.error.message}</p>;
 }
 return (
  <Div>
   {errorMessage}
   <form onSubmit={onSubmitHandler}>
    {form}
    <Button btnType="Success">SUBMIT</Button>
   </form>
   <Button clicked={switchAuthModeHandler} btnType="Danger">
    SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
   </Button>
  </Div>
 );
};

const mapStateToProps = state => {
 return {
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  building: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath
 };
};
const mapDispatchToProps = dispatch => {
 return {
  onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(withRouter(auth));
