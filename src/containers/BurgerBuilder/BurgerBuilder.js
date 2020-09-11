import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const oldTotal = this.state.totalPrice;
        const updatedTotal = oldTotal + INGREDIENT_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotal, purchasable: true});
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const oldTotal = this.state.totalPrice;
        const updatedTotal = oldTotal - INGREDIENT_PRICES[type];

        this.setState({ingredients: updatedIngredients, totalPrice: updatedTotal});
        this.updatePurchaseStateHandler(updatedIngredients);
    }

    updatePurchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map((ingKey) => {
            return ingredients[ingKey];
        }).reduce((subsum, cnt) => {
            return subsum + cnt
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchaseHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Scully',
                address: {
                    street: 'test',
                    zipCode: '12345',
                    country: 'Taiwan'
                },
                email: 'test@usc.edu'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false})
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    purchasing: false})
            });
    }


    render () {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = (<OrderSummary 
            ingredients={this.state.ingredients}
            purchasecancelled={this.cancelPurchaseHandler}
            purchasecontinued={this.continuePurchaseHandler}
            totalPrice={this.state.totalPrice}/>);
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BurgerControls 
                    added={this.addIngredientHandler}
                    removed={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    price={this.state.totalPrice}
                    ordernow={this.state.purchasable}
                    ordered={this.purchasingHandler}
                    />
            </Fragment>
        );
    }
};

export default BurgerBuilder;