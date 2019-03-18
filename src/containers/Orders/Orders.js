import React, { useEffect, Fragment, useState } from "react";
import Order from "../../components/Order/Order";
import axios from "../../config";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
const orders = props => {
 const [loading, setLoading] = useState(true);
 useEffect(() => {
  let token = props.token;
  let userId = props.userId;
  props.getOrders(token, userId);
 }, []);
 let orders = (
  <p style={{ textAlign: "center", padding: "1rem" }}>
   You currently do not have any orders. Please click <Link to="/"> here</Link> to make an order
  </p>
 );
 if (props.orders) {
  orders = props.orders.map(el => {
   return <Order price={el.price} ingredients={el.ingredients} key={el.id} />;
  });
 }

 return <Fragment>{orders}</Fragment>;
};

const mapStateToProps = state => {
 return {
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
 };
};

const mapDispatchToProps = dispatch => {
 return {
  getOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(ErrorHandler(orders, axios));
