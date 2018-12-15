import * as actionTypes from "./actionTypes";
import axios from "../../config";

export const addIngredient = name => {
 return {
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
 };
};
export const removeIngredient = name => {
 return {
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
 };
};

export const setIngredients = ingredients => {
 return {
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
 };
};

export const fetchIngredientsFailed = () => {
 return {
  type: actionTypes.FETCH_INGREDIENTS_FAILED
 };
};
export const initIngredient = () => {
 return dispatch => {
  axios
   .get("https://newburgerapp.firebaseio.com/ingredients.json")
   .then(json => {
    console.log("burgerBuild", json.data);
    if (json.status === 200) {
     dispatch(setIngredients(json.data));
    }
   })
   .catch(error => fetchIngredientsFailed());
 };
};
