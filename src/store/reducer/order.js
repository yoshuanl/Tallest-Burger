import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'; 

const initialState = {
    orders: [],
    loading: false, // to know are we in the process of ordering 
    purchased: false
}
const reducer = (state = initialState, action) => {
    console.log("in reducer", action.orderId);
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false});

        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {loading: true});

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            const updatedObject = {
                loading: false,
                purchased: true, // so the page can redirect to '/'
                orders: state.orders.concat(newOrder) // concat return a new array
            }
            return updateObject(state, updatedObject);

        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, {loading: false});

        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, {loading: true});

        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {orders: action.orders, loading: false});

        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, {loading: false});

        default:
            return state;
    }
};

export default reducer;