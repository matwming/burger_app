import * as actionType from "./actionTypes";
import axios from "axios";
export const authStart = () => {
 return {
  type: actionType.AUTH_START
 };
};
export const authSuccess = authData => {
 let idToken = authData.idToken;
 let userId = authData.localId;
 return {
  type: actionType.AUTH_SUCCESS,
  idToken: idToken,
  userId: userId
 };
};
export const authFail = error => {
 console.log("error_message", error.response.data.error.message);
 return {
  type: actionType.AUTH_FAIL,
  error: error.response.data.error.message
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
    dispatch(authSuccess(res.data));
   })
   .catch(error => {
    console.log("auth_error", error);
    dispatch(authFail(error));
   });
 };
};
