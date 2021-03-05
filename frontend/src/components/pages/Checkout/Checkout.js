import React from 'react';
import adImage from '../../../assets/images/Checkout-Banner.jpg';
import {useSelector} from "react-redux";

import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct';
import styles from '../../../assets/styles/pages/Checkout.module.css';
import Subtotal from '../../Subtotal/Subtotal';

function Checkout() {
    const basket = useSelector(state => state.cart.basket)

    return (
        <div className={styles.checkout}>
            <div className={styles.checkout__left}>
                <img
                    className={styles.checkout__ad}
                    src={adImage}
                    alt=''
                />
                <div>
                    <h3>Hello User </h3>
                    <h2 className={styles.checkout__title}>Your Shopping Basket:</h2>
                </div>
                {basket.map(item => (
                    <CheckoutProduct 
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        ingredients = {item.ingredients}
                    />
                ))}
            </div>
            <div className={styles.checkout__right}>
                <Subtotal/>
            </div>             
        </div>
    )
}

export default Checkout