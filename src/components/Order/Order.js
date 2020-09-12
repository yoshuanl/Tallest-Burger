import React from 'react';

import classes from './Order.css';
    
const order = (props) => {
    const ingredientsArray = [];
    for (let ingredientName in props.ingredients) {
        ingredientsArray.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }
    const ingredientOutput = ingredientsArray.map( ig => {
        return <span key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};
    
export default order;