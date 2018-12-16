import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
 token: null,
 userId: "",
 error: "",
 loading: false,
 authRedirectPath: ""
};
const authStart = (state, action) => {
 //console.log("authStart_initialState", initialState);
 return updateObject(state, {
  error: "",
  loading: true
 });
};
const authSuccess = (state, action) => {
 //console.log("authSuccess_initialState", initialState);
 return updateObject(state, {
  token: action.idToken,
  userId: action.userId,
  error: null,
  loading: false,
  authRedirectPath: "/"
 });
};
const authFail = (state, action) => {
 console.log("authFail_action", action);
 return updateObject(state, {
  error: action.error,
  loading: false
 });
};
const authLogout = (state, action) => {
 return updateObject(state, {
  token: null,
  userId: null
 });
};
const setAuthRedirectPath = (state, action) => {
 return updateObject(state, {
  authRedirectPath: action.path
 });
};
const reducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.AUTH_START:
   return authStart(state, action);
  case actionTypes.AUTH_SUCCESS:
   return authSuccess(state, action);
  case actionTypes.AUTH_FAIL:
   return authFail(state, action);
  case actionTypes.AUTH_LOGOUT:
   return authLogout(state, action);
  case actionTypes.SET_AUTH_REDIRECT:
   return setAuthRedirectPath(state, action);
  default:
   return state;
 }
};
console.log("initialState", initialState);
export default reducer;
