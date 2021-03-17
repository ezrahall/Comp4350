import React from 'react';
import {useSelector} from 'react-redux';

import classes from './Order.module.css'
import NavBar from "../../NavBar/NavBar";
import OrderItem from "./OrderItem/OrderItem";

const Order = (props) => {
    const order = useSelector(state => state.order.currentOrder)
    return (
        <div className={classes.Order}>
            <NavBar/>
            <h1>Order Page</h1>
            <p>{order.orderId}</p>
            <p>{order.orderDate}</p>
            <p>{order.orderTotal}</p>
            <div className={classes.OrderItems}>
                <h3>Order Items</h3>
                {order.orderItems.map((item) => <OrderItem item={item}/>)}
            </div>
        </div>
    );
};

export default Order;