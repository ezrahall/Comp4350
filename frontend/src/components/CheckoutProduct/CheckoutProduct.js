import React from 'react'
import {useDispatch} from "react-redux";

import styles from '../../assets/styles/CheckoutProduct.module.css'
import {removeFromBasket as removeBasket} from '../../store/actions/cart';

function CheckoutProduct({id,image,title,price}) {
    const dispatch = useDispatch()

    const removeFromBasket = () => {
        dispatch(removeBasket(id));
    }

    return (
        <div className={styles.checkoutProduct}>
            <img className={styles.checkoutProduct__image} src={image} alt={title}/>
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