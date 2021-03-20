import React from 'react';
import adImage from '../../../assets/images/Checkout-Banner.jpg';
import {useSelector} from "react-redux";

import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct';
import styles from '../../../assets/styles/pages/Checkout.module.css';
import Subtotal from '../../Subtotal/Subtotal';
import NavBar from '../../NavBar/NavBar';

function Checkout() {
    const basket = useSelector(state => state.cart.basket)

    return (
        <div className={styles.checkout}>
            <NavBar />
            <div className={styles.checkout__left}>
                <img
                    className={styles.checkout__ad}
                    src={adImage}
                    alt=''
                />
                <div className={styles.checkout__titleContainer}>
                    <p>Hello User </p>
                    <p className={styles.checkout__title}>Your Shopping Basket:</p>
                </div>
                <br />
    
                {basket.map(item => (
                    <CheckoutProduct 
                        key = {item.id}
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        ingredients = {item.ingredients}
                    />
                ))}
            </div>
            <div className={styles.checkout__subtotal}>
                <Subtotal/>
            </div>
 
                  
        </div>
    )
}

export default Checkout