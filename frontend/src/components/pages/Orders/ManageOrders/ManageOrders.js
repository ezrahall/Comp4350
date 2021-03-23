import React, {useEffect, useState} from 'react';
import classes from './ManageOrders.module.css'
import OrderSummary from "../OrderSummary/OrderSummary";
import {getOrders} from "../../../../services/orders/orders";

// const orders = [
//     {orderId: 1, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
//     {orderId: 2, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
//     {orderId: 3, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
//     {orderId: 4, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
// ];

const ManageOrders = (props) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders()
            .then((data) => setOrders(data))
    },[])

    return (
        <div className={classes.ManageOrders}>
            {orders.length > 0 ? orders.map((order) =>
                <OrderSummary
                    order={order}
                />) : (<p>No Current Orders</p>)}
        </div>
    );
};

export default ManageOrders;