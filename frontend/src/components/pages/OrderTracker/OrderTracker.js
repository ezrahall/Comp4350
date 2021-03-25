import React, {useEffect, useState} from 'react';

import classes from './OrderTracker.module.css'
import NavBar from "../../NavBar/NavBar";
import Tracker from "../../../ui/Tracker/Tracker";
import {getOrderCustomer} from "../../../services/orders/orders";

const OrderTracker = (props) => {
    const [order, setOrder] = useState(null)

    useEffect(()=>{
        getOrderCustomer()
            .then((data) => setOrder(data[0]))
    },[])

    return (
        <div>
            <NavBar/>
            {order ? <div className={classes.OrderTracker}>
                <h1 className={classes.Title}>Order Tracker</h1>
                <h3 className={classes.RestaurantName}>Currently Tracking Order From {order.restaurant_name}</h3>
                <h3>Order Stage: {order.state}</h3>
                <div className={classes.Tracker}>
                    <Tracker stage={order.state}/>
                </div>
                <div className={classes.OrderInfo}>
                    <h3>Order Info</h3>
                    {order.order.map((item) =>
                        <div>
                            <h4>{item.menu_item}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {item.price}</p>
                        </div>
                    )}
                </div>
            </div>:
                <p>No Current Order</p>}
        </div>
    );
};

export default OrderTracker;