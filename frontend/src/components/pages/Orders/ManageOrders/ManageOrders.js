import React from 'react';
import classes from './ManageOrders.module.css'
import OrderSummary from "../OrderSummary/OrderSummary";

const orders = [
    {orderId: 1, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
    {orderId: 2, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
    {orderId: 3, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
    {orderId: 4, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
];

const ManageOrders = (props) => {
    return (
        <div className={classes.ManageOrders}>
            {orders.map((order) =>
                <OrderSummary
                    order={order}
                />)}
        </div>
    );
};

export default ManageOrders;