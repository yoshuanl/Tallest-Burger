import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        // setTimeout takes millisec
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

// action that holds the async code (authentication)
export const auth = (email, password, isSignup) => {
    // return a function that gets dispatch as argument, (thanks to redux thunk!)
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        console.log('isSignup', isSignup)
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0ezIuED56cCKf7Hh1AzziFZgI6jNyyUo';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0ezIuED56cCKf7Hh1AzziFZgI6jNyyUo';
        }
        axios.post(url, authData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    }
} 