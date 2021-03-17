import React from 'react';
import CurrencyFormat from 'react-currency-format';
import {useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';

import styles from '../../assets/styles/Subtotal.module.css';

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
                            <input type="checkbox" /> Share as a Gift?
                        </small>
                    </>
                )}
                decimalScale={2}
                value={basket.reduce((amount, item) => parseFloat(item.price) + amount, 0)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal