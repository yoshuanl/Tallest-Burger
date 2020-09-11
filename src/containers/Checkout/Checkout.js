import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
    
class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            cheese: 0,
            meat: 1,
            bacon: 1
        }
    }

    // whenever this component is loaded, this part will be mount
    componentDidMount () {
        // this.props.location.search include ? and =
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}
        for (let param of query.entries()) {
            // param = ['salad', '1']
            ingredients[param[0]] = +param[1]
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        // replace or push are ways to change the page after some operations are completed
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
            </div>
        )
        
    }
}

    
export default Checkout;