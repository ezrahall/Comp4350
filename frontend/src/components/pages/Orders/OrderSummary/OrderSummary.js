import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux'

import classes from './OrderSummary.module.css';
import {setOrder} from '../../../../store/actions/orders';


const OrderSummary = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const goToOrder = () => {
        console.log(
            props.order
        )
        dispatch(setOrder(props.order))
        history.push('manageOrders/order');
    }

    return (
        <div
            className={classes.Order}
            onClick={goToOrder}
        >
            <p><b>Order Id: </b>{props.order.orderId}</p>
            <p><b>Date Placed: </b>{props.order.orderDate}</p>
            <p><b>Order Items: </b>{props.order.orderItems.join(', ')}</p>
            <p><b>Order Total: </b> ${props.order.orderTotal}</p>
        </div>
    );
};

export default OrderSummary;