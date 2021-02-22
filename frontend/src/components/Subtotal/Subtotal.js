import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../ContextAPI/StateProvider';
import { getBasketTotal } from '../../ContextAPI/reducer';

function Subtotal() {

    const [{basket},dispatch] = useStateValue();

    const history = useHistory();

    return (
        <div className='subtotal'>
                <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            
                            Subtotal ({basket?.length} items):
                            <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
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
