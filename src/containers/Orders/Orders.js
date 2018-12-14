import React, { Component, Fragment } from "react";

import Order from "../../components/Order/Order";
import axios from "../../config";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
class Orders extends Component {
 state = {
  orders: [],
  loading: true
 };
 componentDidMount() {
  axios
   .get("/orders.json")
   .then(res => {
    if (res.status === 200) {
     const fetchedOrders = [];
     for (let key in res.data) {
      fetchedOrders.push({
       ...res.data[key],
       id: key
      });
     }
     this.setState({
      orders: fetchedOrders,
      loading: false
     });
    }
   })
   .catch(err => {
    this.setState({
     loading: false
    });
    console.log("error", err);
   });
 }
 render() {
  console.log(this.state.orders);
  let orders = null;
  if (this.state.orders) {
   orders = this.state.orders.map(el => {
    return <Order price={el.price} ingredients={el.ingredients} key={el.id} />;
   });
  }
  return <Fragment>{orders}</Fragment>;
 }
}

export default ErrorHandler(Orders, axios);
