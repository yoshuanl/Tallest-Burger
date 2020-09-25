import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'; 

const initialState = {
    ingredients: null, // fetch from server
    totalPrice: 4,
    error: false
}

// TODO: handle price in server
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient1 = {
        ...state.ingredients, // create deep clone
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedObject1 = {ingredients: updatedIngredient1, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]}
    return updateObject(state, updatedObject1);
};

const removeIngredient = (state, action) => {
    const updatedIngredient2 = {
        ...state.ingredients, // create deep clone
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedObject2 = {ingredients: updatedIngredient2, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]}
    return updateObject(state, updatedObject2);
};

const setIngredient = (state, action) => {
    const updatedObject3 = {ingredients: action.ingredients, totalPrice: 4, error: false}
    return updateObject(state, updatedObject3);
};

const fetchIngredientFail = (state) => {
    return updateObject(state, {error: true});
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientFail(state);
        default: return state;
    }
};

export default reducer;