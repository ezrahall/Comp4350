import React from 'react';
import classes from './Orders.module.css';
import NavBar from "../../NavBar/NavBar";
import ManageOrders from "./ManageOrders/ManageOrders";

const Orders = (props) => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    return (
        <div className={classes.Orders}>
            <NavBar/>
            <div>
                <h2>{user.name}</h2>
            </div>
            <div className={classes.OrderList}>
                <ManageOrders/>
            </div>
        </div>
    );
}

export default Orders;