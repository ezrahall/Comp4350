import React from 'react';

import classes from './OrderTracker.module.css'
import NavBar from "../../NavBar/NavBar";
import Tracker from "../../../ui/Tracker/Tracker";

const OrderTracker = (props) => {
    const order = {
        restaurantName: 'Bad Food Place',
        restaurantAddress: '2 S Way',
        deliveryAddress: '66 Chancelor',
        stage: 2,
        order: [
            {
                name: 'Burger',
                quantity: 3,
            }
        ]
    }
    return (
        <div>
            <NavBar/>
            <div className={classes.OrderTracker}>
                <h1 className={classes.Title}>Order Tracker</h1>
                <h3 className={classes.RestaurantName}>Currently Tracking Order From {order.restaurantName}</h3>
                <h3>Order Stage: {order.stage}</h3>
                <div className={classes.Tracker}>
                    <h3>Restaurant Address: {order.restaurantAddress}</h3>
                    <Tracker stage={order.stage}/>
                    <h3>Delivery Address: {order.deliveryAddress}</h3>
                </div>
                <div className={classes.OrderInfo}>
                    <h3>Order Info</h3>
                    {order.order.map((item) =>
                        <div>
                            <h4>{item.name}</h4>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderTracker;