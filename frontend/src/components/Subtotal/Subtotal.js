import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom';

import styles from '../styles/Subtotal.module.css'
import {useSelector} from "react-redux";

const Subtotal = () => {
    const basket = useSelector(state => state.cart.basket)

    const history = useHistory();

    return (
        <div className={styles.subtotal}>
                <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            
                            Subtotal ({basket.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className={styles.subtotal__gift}>
                            <input type="checkbox" /> Make someone happy with a gift?
                        </small>
                    </>
                )}
                decimalScale={2}
                value={basket.reduce((amount, item) => item.price + amount, 0)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
            
        </div>
    )
}

export default Subtotal
