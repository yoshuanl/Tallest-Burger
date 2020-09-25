import axios from 'axios';

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
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail());
        })
    }
} 