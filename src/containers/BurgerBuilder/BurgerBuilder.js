import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {
    // leave only UI related state here
    state = {
        purchasing: false, // for showing the modal
        //loading: false, // for showing the spinner
        //error: false // for showing the error message
    };

    componentDidMount () {
        console.log('this.props', this.props)
        this.props.onInitIngredients();
        console.log('after init', this.props.ing);
    }

    updatePurchasableHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map((ingKey) => {
            return ingredients[ingKey];
        }).reduce((subsum, cnt) => {
            return subsum + cnt
        }, 0);
        return sum > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


    render () {
        let disabledInfo = {
            ...this.props.ing
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        console.log('-----this.props.ing', this.props.ing)
        let orderSummary = null;
        console.log('error?', this.props.error)
        let burger = this.props.error ? <p>Couldn't load ingredients</p> : <Spinner/>;

        if (this.props.ing) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ing}/>
                    <BurgerControls 
                        added={this.props.onIngredientAdded}
                        removed={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.ttlPr}
                        ordernow={this.updatePurchasableHandler(this.props.ing)}
                        ordered={this.purchasingHandler}/>
                </Fragment>);
            orderSummary = (<OrderSummary 
                ingredients={this.props.ing}
                purchasecancelled={this.cancelPurchaseHandler}
                purchasecontinued={this.continuePurchaseHandler}
                totalPrice={this.props.ttlPr}/>);
        }
        
        // if (this.state.loading) {
        //     orderSummary = <Spinner/>;
        // }
        
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
};

// mapStateToProps holds a function which receive the state automatically
// and return a object that defines which property should hold which slice of the state
const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        ttlPr: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
// mapStateToProps holds a function which receive dispatch function as an arguement
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
// we can have as many hoc as we wish
// "connect" will set some props for the components it is wrapping
// mapStateToProps, mapDispatchToProps down here is not interchangable
// we can still handle the error with our hoc because we still use axios instance, no matter we send request from where
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));