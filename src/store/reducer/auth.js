import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {token: action.token, userId: action.userId, error: null, loading: false});
}

const authFail = (state, action) => {
    console.log(action.error);
    return updateObject(state, {error: action.error, loading: false});
}

const authLogout = (state) => {
    return updateObject(state, {token: null, userId: null});
}

// set to initialState at the beginning otherwise it is undefined
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
}

export default reducer;