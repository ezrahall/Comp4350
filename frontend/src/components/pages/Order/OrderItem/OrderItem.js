import React from 'react';

import classes from './OrderItem.module.css'

const OrderItem = (props) => {
    return (
        <div className={classes.OrderItem}>
            <p><b>{props.item.quantity}x </b>{props.item.menu_item}</p>
        </div>
    );
};

export default OrderItem;