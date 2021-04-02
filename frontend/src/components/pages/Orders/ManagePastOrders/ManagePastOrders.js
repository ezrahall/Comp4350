import React, {useEffect, useState} from 'react';
import classes from '../ManageOrders/ManageOrders.module.css'
import OrderSummary from '../OrderSummary/OrderSummary';
import {getPastOrders} from '../../../../services/orders/orders';

const ManagePastOrders = (props) => {
    const [orders, setOrders] = useState([])


    useEffect(() => {
        getPastOrders()
            .then((data) => setOrders(data))
    },[])

    return (
        <div className={classes.ManageOrders}>
            {orders.length > 0 ? orders.map((order) =>
                <OrderSummary
                    order={order}
                    pastOrder={true}
                />) : (<p>No Current Orders</p>)}
        </div>
    );
};

export default ManagePastOrders;