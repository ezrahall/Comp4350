import React, {useEffect, useState} from 'react';
import classes from '../ManageOrders/ManageOrders.module.css'
import OrderSummary from "../OrderSummary/OrderSummary";
import Order from '../../Order/Order';
import {getPastOrders} from "../../../../services/orders/orders";
import {useSelector} from "react-redux";

// const orders = [
//     {orderId: 1, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
//     {orderId: 2, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
//     {orderId: 3, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
//     {orderId: 4, orderDate: new Date().toDateString(), orderItems: ['tacos', 'fish', '1919'], orderTotal: 22.22},
// ];

const ManagePastOrders = (props) => {
    const [orders, setOrders] = useState([])
    const order = useSelector(state => state.order.currentOrder)


    useEffect(() => {
        getPastOrders()
            .then((data) => setOrders(data))
    },[])

    return (
        <div className={classes.ManageOrders}>
            {order ?
                <Order/> :
                (orders.length > 0 ? orders.map((order) =>
                <OrderSummary
                    order={order}
                />) : (<p>No Current Orders</p>))}
        </div>
    );
};

export default ManagePastOrders;