import React from 'react'
import {Link} from 'react-router-dom'


import styles from '../../styles/pages/Payment.module.css'
import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct'
import {useSelector} from "react-redux";


function Payment() {
    const basket = useSelector(state => state.cart.basket)


    return (
        <div className={styles.payment}>
            <div className={styles.payment__container}>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items </Link>)
                </h1>

                {/*Delivery*/}
                <div className={styles.payment__section}>
                    <div className={styles.payment__title}>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className={styles.payment__address}>
                        <p>User</p>
                        <p>123 Test Drive</p>
                        <p>Peg City, Canada</p>
                    </div>

                </div>
                {/*Items*/}
                <div className={styles.payment__section}>
                    <div className={styles.payment__title}>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className={styles.payment__items}>
                        {basket.map(item => (

                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />

                        ))}
                    </div>
                </div>
                {/*Payment method*/}
                <div className={styles.payment__section}>
                    <div className={styles.payment__title}>
                        <h3>Payment Method</h3>
                    </div>
                    <div className={styles.payment__details}>
                        
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}



export default Payment
