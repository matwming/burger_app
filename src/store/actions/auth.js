import * as actionType from "./actionTypes";
import axios from "axios";
export const authStart = () => {
 return {
  type: actionType.AUTH_START
 };
};
export const authSuccess = (token, userId) => {
 return {
  type: actionType.AUTH_SUCCESS,
  idToken: token,
  userId: userId
 };
};
export const authFail = error => {
 console.log("error_message", error);
 return {
  type: actionType.AUTH_FAIL,
  error: error
 };
};
export const logout = () => {
 localStorage.removeItem("token");
 localStorage.removeItem("expirationDate");
 localStorage.removeItem("userId");
 return {
  type: actionType.AUTH_LOGOUT
 };
};
export const checkAuthTimeout = expirationTime => {
 return dispatch => {
  setTimeout(() => {
   dispatch(logout());
  }, expirationTime * 1000);
 };
};
export const auth = (email, password, isSignUp) => {
 return dispatch => {
  dispatch(authStart());
  let authData = {
   email: email,
   password: password,
   returnSecureToken: true
  };
  let url =
   "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCQE93kZeQUnCyUlgHMH0VokKdxc1Le564";
  console.log("authData", authData);
  if (!isSignUp) {
   url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCQE93kZeQUnCyUlgHMH0VokKdxc1Le564";
  }
  axios
   .post(url, authData)
   .then(res => {
    console.log("auth_res", res);
    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
    localStorage.setItem("token", res.data.idToken);
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("userId", res.data.localId);
    dispatch(authSuccess(res.data.idToken, res.data.localId));
    dispatch(checkAuthTimeout(res.data.expiresIn));
   })
   .catch(error => {
    console.log("auth_error", error);
    dispatch(authFail(error.response.data.error));
   });
 };
};
export const setAuthRedirectPath = path => {
 return {
  type: actionType.SET_AUTH_REDIRECT,
  path: path
 };
};

export const authCheckState = () => {
 return dispatch => {
  const token = localStorage.getItem("token");
  if (!token) {
   dispatch(logout());
  } else {
   const expirationDate = new Date(localStorage.getItem("expirationDate"));
   if (expirationDate > new Date()) {
    const userId = localStorage.getItem("userId");
    dispatch(authSuccess(token, userId));
    dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
   } else {
    dispatch(logout());
   }
  }
 };
};
