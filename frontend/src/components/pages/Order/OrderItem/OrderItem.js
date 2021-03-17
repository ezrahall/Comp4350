import React from 'react';

import classes from './OrderItem.module.css'

const OrderItem = (props) => {
    return (
        <div className={classes.OrderItem}>
            <p>{props.item}</p>
        </div>
    );
};

export default OrderItem;