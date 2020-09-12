import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault(); // the default behavior of a <form/> is to send the request and reload the page
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
    render () {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input inputtype="input" type="text" name="mail" placeholder="Your mail"/>
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>
                <Input inputtype="input" type="text" name="city" placeholder="City"/>
                <Input inputtype="input" type="text" name="street" placeholder="Street"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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