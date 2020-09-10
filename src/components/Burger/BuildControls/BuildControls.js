import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <div>Current Price: <strong>${props.price.toFixed(2)}</strong></div>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.added(ctrl.type)}
                    removed={() => props.removed(ctrl.type)}
                    disabled={props.disabledInfo[ctrl.type]} />
            ))}
            <button className={classes.OrderButton} disabled={!props.ordernow} onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
};

export default BuildControls;