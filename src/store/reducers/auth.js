import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
 token: "",
 userId: "",
 error: "",
 loading: ""
};
const authStart = (state, action) => {
 return updateObject(state, {
  error: null,
  loading: true
 });
};
const authSuccess = (state, action) => {
 return updateObject(state, {
  token: action.idToken,
  userId: action.userId,
  error: null,
  loading: false
 });
};
const authFail = (state, action) => {
 return updateObject(state, {
  error: action.error,
  loading: false
 });
};
const reducer = (state = initialState, action) => {
 switch (action.type) {
  case actionTypes.AUTH_START:
   return authStart();
  case actionTypes.AUTH_SUCCESS:
   return authSuccess();
  case actionTypes.AUTH_FAIL:
   return authFail();
  default:
   return state;
 }
};

export default reducer;
