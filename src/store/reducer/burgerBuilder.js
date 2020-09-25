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
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient1 = {
                ...state.ingredients, // create deep clone
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedObject1 = {ingredients: updatedIngredient1, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]}
            return updateObject(state, updatedObject1);

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient2 = {
                ...state.ingredients, // create deep clone
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedObject2 = {ingredients: updatedIngredient2, totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]}
            return updateObject(state, updatedObject2);

        case actionTypes.SET_INGREDIENTS:
            const updatedObject3 = {ingredients: action.ingredients, totalPrice: 4, error: false}
            return updateObject(state, updatedObject3);

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
            
        default:
            return state;

    }
}

export default reducer;