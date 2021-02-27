import React from 'react'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom';

import styles from '../styles/Subtotal.module.css'
import { useStateValue } from '../../ContextAPI/StateProvider';
import { getBasketTotal } from '../../ContextAPI/reducer';

const Subtotal = () => {

    const [{basket}, dispatch] = useStateValue();

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
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button onClick={e=>history.push('/payment')}>Proceed to Checkout</button>
            
        </div>
    )
}

export default Subtotal
