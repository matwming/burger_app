import React, { useEffect, Suspense } from "react";
import Layout from "./components/UI/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import { connect } from "react-redux";

const Checkout = React.lazy(() => {
 return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
 return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
 return import("./containers/Auth/Auth");
});
const app = props => {
 useEffect(() => {
  props.onTryAutoSignUp();
 }, []);

 let routes = (
  <Switch>
   <Route path="/auth" render={props => <Auth {...props} />} />
   <Route path="/" exact component={BurgerBuilder} />
   <Redirect to="/" />
  </Switch>
 );
 if (props.isAuthenticated) {
  routes = (
   <Switch>
    <Route path="/auth" render={props => <Auth {...props} />} />
    <Route path="/checkout" render={props => <Checkout {...props} />} />
    <Route path="/orders" render={props => <Orders {...props} />} />

    <Route path="/logout" component={Logout} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
   </Switch>
  );
 }
 return (
  <Layout>
   <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
  </Layout>
 );
};

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
export default withRouter(
 connect(
  mapStateToProps,
  mapDispatchToProps
 )(app)
);
