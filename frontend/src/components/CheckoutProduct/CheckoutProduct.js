import React from 'react'
import { useStateValue } from '../../ContextAPI/StateProvider'

import styles from '../styles/CheckoutProduct.module.css'

function CheckoutProduct({id,image,title,price}) {

    const [{basket}, dispatch] = useStateValue();

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
