import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import classes from '../../../assets/styles/pages/Order.module.css';
import OrderItem from './OrderItem/OrderItem';
import {increaseState, orderNull} from '../../../store/actions/orders';

const Order = (props) => {
    const order = useSelector(state => state.order.currentOrder)
    const dispatch = useDispatch();
    let orderState;
    switch (order.state){
        case '0':
            orderState = 'Order Placed'
            break;
        case '1':
            orderState = 'Order Confirmed'
            break;
        case '2':
            orderState = 'Order Cooking'
            break;
        case '3':
            orderState = 'Order Out For Delivery'
            break
        case '4':
            orderState = 'Order Delivered'
            break
        default:
            orderState = 'Not known error!'
    }

    const increaseStateFromActions = () => {
        dispatch(increaseState(order.id))
    }

    const allOrders = () => {
        dispatch(orderNull())
    }

    return (
        <div className={classes.Order}>
            <div className={classes.ButtonHolder}>
            <button
                className={classes.Back}
                onClick={allOrders}
            >
                <ArrowBackIcon/>
            </button>
            </div>
            <h1>Order {order.id.slice(10, 15)}</h1>
            <h3>Address: {order.address}</h3>
            <div className={classes.order__items}>
                <h3>Order Items</h3>
                {order.order.map((item) => <OrderItem item={item}/>)}
            </div>
            {!(order.state < 0 || order.state > 4) &&<div className={classes.order__items}>
                <h4>Order State: {orderState}</h4>
                <div>
                    <button className={classes.Complete} onClick={increaseStateFromActions} disabled={parseInt(order.state) >= 4}>Mark State As Complete</button>
                    <button className={classes.Cancel}>Cancel Order</button>
                </div>
            </div>}
        </div>
    );
};

export default Order;