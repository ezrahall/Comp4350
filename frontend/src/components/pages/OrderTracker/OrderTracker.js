import React, {useEffect, useState} from 'react';

import classes from '../../../assets/styles/pages/OrderTracker.module.css'
import NavBar from '../../NavBar/NavBar';
import Tracker from '../../../ui/Tracker/Tracker';
import {getOrderCustomer} from '../../../services/orders/orders';

const OrderTracker = (props) => {
    const [order, setOrder] = useState(null)

    useEffect(()=>{
        getOrderCustomer()
            .then((data) => setOrder(data))
    },[])

    return (
        <div>
            <NavBar/>
            {order ? <div className={classes.OrderTracker}>
                <h1 className={classes.Title}>{order.state >=4 ? 'Most Recent Order' : 'Order Tracker'}</h1>
                <h3 className={classes.RestaurantName}>Currently Tracking Order From {order.restaurant_name}</h3>
                <h3>Order Stage: {order.state}</h3>
                <div className={classes.Tracker}>
                    <Tracker stage={order.state}/>
                </div>
                <div className={classes.OrderInfo}>
                    <h3>Order Info</h3>
                    {order.order.map((item) =>
                        <div key={item.menu_item}>
                            <h4>{item.menu_item}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    )}
                </div>
            </div>:
                <p>No Current Order</p>}
        </div>
    );
};
export default OrderTracker;