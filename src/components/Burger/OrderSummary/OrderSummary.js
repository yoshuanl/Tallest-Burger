import React, { Component, Fragment } from 'react';

import Button from '../../UI/Button/Button';
    
class OrderSummary extends Component {
    componentDidUpdate () {
        console.log("component will update")
    }
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients).map((ingKey) => {
            return (
                <li key={ingKey}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {this.props.ingredients[ingKey]}
                </li>);
        });
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Proceed to checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchasecancelled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchasecontinued}>CONTINUE</Button>
            </Fragment>
        )
    }
};
    
export default OrderSummary;