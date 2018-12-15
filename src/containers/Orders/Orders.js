import React, { Component, Fragment } from "react";
import Order from "../../components/Order/Order";
import axios from "../../config";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Link } from "react-router-dom";
class Orders extends Component {
 state = {
  loading: true
 };
 componentDidMount() {
  this.props.getOrders();
 }
 render() {
  console.log(this.props.orders);
  let orders = (
   <p style={{ textAlign: "center", padding: "1rem" }}>
    You currently do not have any orders. Please click <Link to="/"> here</Link> to make an order
   </p>
  );
  if (this.props.orders) {
   orders = this.props.orders.map(el => {
    return <Order price={el.price} ingredients={el.ingredients} key={el.id} />;
   });
  }

  return <Fragment>{orders}</Fragment>;
 }
}
const mapStateToProps = state => {
 return {
  orders: state.order.orders,
  loading: state.order.loading
 };
};

const mapDispatchToProps = dispatch => {
 return {
  getOrders: () => dispatch(actions.fetchOrders())
 };
};
export default connect(
 mapStateToProps,
 mapDispatchToProps
)(ErrorHandler(Orders, axios));