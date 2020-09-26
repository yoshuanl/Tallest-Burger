import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class Orders extends Component {
    componentDidMount () {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        console.log("in Order", this.props.orders)
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
        );
    }
}

const mapStateToProp = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}


export default connect(mapStateToProp, mapDispatchToProp)(withErrorHandler(Orders, axios));