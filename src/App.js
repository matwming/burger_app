import React, { Component } from "react";
import Layout from "./components/UI/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
//import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
const asyncCheckout = asyncComponent(() => {
 return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
 return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
 return import("./containers/Auth/Auth");
});
class App extends Component {
 state = {
  isAuthenticated: false
 };
 componentDidMount() {
  let token = localStorage.getItem("token");
  if (token) {
   this.setState({
    isAuthenticated: true
   });
  }
 }
 render() {
  let routes = (
   <Switch>
    <Route path="/auth" component={asyncAuth} />
    <Route path="/" exact component={BurgerBuilder} />

    {/* <Redirect to="/" /> */}
   </Switch>
  );
  if (this.state.isAuthenticated) {
   routes = (
    <Switch>
     <Route path="/checkout" component={asyncCheckout} />
     <Route path="/orders" component={asyncOrders} />
     <Route path="/auth" component={asyncAuth} />
     <Route path="/logout" component={Logout} />
     <Route path="/" exact component={BurgerBuilder} />
     <Redirect to="/" />
    </Switch>
   );
  }
  return <Layout>{routes}</Layout>;
 }
}
const mapStateToProps = state => {
 return {
  isAuthenticated: state.auth.token !== null
 };
};
const mapDispatchToProps = dispatch => {
 return {
  onTryAutoSignUp: () => dispatch(actions.authCheckState())
 };
};
export default App;
