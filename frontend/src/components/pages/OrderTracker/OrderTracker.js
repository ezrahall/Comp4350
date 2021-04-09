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

    let orderState = 0;
    if(order) {
        switch (order.state) {
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
    }

    return (
        <div>
            <NavBar
                hideSearch
            />
            {order ? <div className={classes.OrderTracker}>
                <h1 className={classes.Title}>{order.state >=4 ? 'Most Recent Order' : 'Order Tracker'}</h1>
                <h3 className={classes.RestaurantName}>Currently Tracking Order From {order.restaurant_name}</h3>
                <h3>Order Stage: {orderState}</h3>
                <div className={classes.Tracker}>
                    {window.innerWidth > 500 && <Tracker stage={order.state}/>}
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