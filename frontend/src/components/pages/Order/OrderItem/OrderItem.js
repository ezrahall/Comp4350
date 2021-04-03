import React from 'react';

import classes from '../../../../assets/styles/pages/OrderItem.module.css'

const OrderItem = (props) => {
    return (
        <div className={classes.order__item}>
            <p><b>{props.item.quantity}x </b>{props.item.menu_item}</p>
        </div>
    );
};

export default OrderItem;