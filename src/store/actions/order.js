import * as actionType from "./actionTypes";
import axios from "../../config";

export const purchaseBurgerSuccess = (id, orderData) => {
 return {
  type: actionType.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData: orderData
 };
};

export const purchaseBurgerFail = error => {
 return {
  type: actionType.PURCHASE_BURGER_FAIL,
  error: error
 };
};
export const purchaseBurgerStart = () => {
 return {
  type: actionType.PURCHASE_BURGER_START
 };
};
export const purchaseBurger = orderData => {
 return dispatch => {
  dispatch(purchaseBurgerStart());
  axios
   .post("/orders.json", orderData)
   .then(json => {
    console.log(json);
    if (json.status === 200) {
     dispatch(purchaseBurgerSuccess(json.data.name, orderData));
    }
   })
   .catch(error => {
    dispatch(purchaseBurgerFail(error));
   });
 };
};

export const purchaseInit = () => {
 return {
  type: actionType.PURCHASE_INIT
 };
};
export const fetchOrdersSuccess = orders => {
 return {
  type: actionType.FETCH_ORDERS_SUCCESS,
  orders: orders
 };
};
export const fetchOrdersFail = error => {
 return {
  type: actionType.FETCH_ORDERS_FAIL,
  error: error
 };
};
export const fetchOrdersStart = () => {
 return {
  type: actionType.FETCH_ORDERS_START
 };
};

export const fetchOrders = () => {
 return dispatch => {
  dispatch(fetchOrdersStart());
  axios
   .get("/orders.json")
   .then(res => {
    let fetchedOrders = [];
    if (res.status === 200) {
     for (let key in res.data) {
      fetchedOrders.push({
       ...res.data[key],
       id: key
      });
     }
     dispatch(fetchOrdersSuccess(fetchedOrders));
    }
   })
   .catch(err => {
    dispatch(fetchOrdersFail(err));
   });
 };
};