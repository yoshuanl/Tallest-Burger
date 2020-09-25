import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'; 

const initialState = {
    orders: [],
    loading: false, // to know are we in the process of ordering 
    purchased: false
};

const purchaseInit = (state) => {
    return updateObject(state, {purchased: false});
};

const purchaseStart = (state) => {
    return updateObject(state, {loading: true});
};

const purchaseSuccess = (state, action) => {
    console.log("in purchaseSuccess", action);
    const newOrder = {
        ...action.orderData,
        id: action.orderID
    };
    const updatedObject = {
        loading: false,
        purchased: true, // so the page can redirect to '/'
        orders: state.orders.concat(newOrder) // concat return a new array
    }
    console.log('updatedObject', updatedObject)
    return updateObject(state, updatedObject);
};

const purchaseFail = (state) =>{
    return updateObject(state, {loading: false});
};

const fetchStart = (state) =>{
    return updateObject(state, {loading: true});
};

const fetchSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false});
}

const fetchFail = (state) => {
    return updateObject(state, {loading: false});
}


const reducer = (state = initialState, action) => {
    console.log("action in reducer", action);
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFail(state);
        case actionTypes.FETCH_ORDER_START: return fetchStart(state);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAIL: return fetchFail(state);
        default:
            return state;
    }
};

export default reducer;