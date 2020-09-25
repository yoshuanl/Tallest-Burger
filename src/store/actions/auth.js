import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// action that holds the async code (authentication)
export const auth = (email, password) => {
    // return a function that gets dispatch as argument, (thanks to redux thunk!)
    return dispatch => {
        dispatch(authStart());
    }
} 