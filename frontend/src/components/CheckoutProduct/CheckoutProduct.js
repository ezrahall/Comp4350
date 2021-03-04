import React from 'react'

import styles from '../styles/CheckoutProduct.module.css'
import {useDispatch} from "react-redux";

function CheckoutProduct({id,image,title,price}) {
    const dispatch = useDispatch()


    const removeFromBasket = () => {

        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id: id,
        })

    }

    return (
        <div className={styles.checkoutProduct}>
            <img className={styles.checkoutProduct__image} src={image} alt='' 
            />

            <div className={styles.checkoutProduct__info}>
                <p className={styles.chekcoutProduct__title}>{title}</p>
                <p className={styles.checkoutProduct__price}>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <button onClick={removeFromBasket}>Remove</button>
            </div>



        </div>
    )
}

export default CheckoutProduct
