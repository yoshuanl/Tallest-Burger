import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
    
class Logout extends Component {
    // want to log out when we enter this page
    componentDidMount () {
        this.props.onLogout();
    }
    render () {
        return (<Redirect to="/"/>);
    }
    
};

const mapDispatchToProp = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}
    
export default connect(null, mapDispatchToProp)(Logout);