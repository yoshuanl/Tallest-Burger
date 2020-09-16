import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        //ingredients: null,
        //totalPrice: 4,
        purchasable: false, // for checking if user adds any ingredient
        purchasing: false, // for showing the modal
        loading: false, // for showing the spinner
        error: false // for showing the error message
    };

    componentDidMount () {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => this.setState({error: true}) )
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({ // one of the special props provided by the Router
            pathname: '/checkout',
            search:'?' + queryString}); 
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
        let burger = this.state.error ? <p>Couldn't load ingredients</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ing}/>
                    <BurgerControls 
                        added={this.props.onIngredientAdded}
                        removed={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.ttlPr}
                        ordernow={this.state.purchasable}
                        ordered={this.purchasingHandler}/>
                </Fragment>);
            orderSummary = (<OrderSummary 
                ingredients={this.props.ing}
                purchasecancelled={this.cancelPurchaseHandler}
                purchasecontinued={this.continuePurchaseHandler}
                totalPrice={this.props.ttlPr}/>);
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }
        
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
        ing: state.ingredients,
        ttlPr: state.totalPrice
    }
}
// mapStateToProps holds a function which receive dispatch function as an arguement
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
// we can have as many hoc as we wish
// "connect" will set some props for the components it is wrapping
// mapStateToProps, mapDispatchToProps down here is not interchangable
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));