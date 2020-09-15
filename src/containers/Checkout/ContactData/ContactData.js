import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', // normal html tags name
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input', // normal html tags name
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            country: {
                elementType: 'input', // normal html tags name
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            street: {
                elementType: 'input', // normal html tags name
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input', // normal html tags name
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP-Code'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select', // normal html tags name
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'} ]
                },
                value: ''
            }
        },

        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); // the default behavior of a <form/> is to send the request and reload the page
        this.setState({loading: true});
        const formData = {};
        for (let formEleIdentifier in this.state.orderForm) {
            formData[formEleIdentifier] = this.state.orderForm[formEleIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            deliveryMethod: 'fastest'
        }
        // .json is important for Firebase
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/'); 
                // we can't do this if we did'nt pass props from Checkout
                // because rendering <ContactData/> manualy in Checkout component, no .history
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log("inputChangedHandler")
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElement = {...this.state.orderForm[inputIdentifier]};
        updatedElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElement;

        this.setState({orderForm: updatedOrderForm})
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            // use onSubmit instead of onClick in button
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/> // formElement.id is the key, which is name, email, ...
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;