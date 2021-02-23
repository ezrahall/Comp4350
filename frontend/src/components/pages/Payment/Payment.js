import React from 'react'
import { useStateValue } from '../../../ContextAPI/StateProvider'
import './Payment.css'
import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct'
import {Link} from 'react-router-dom'

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue();


    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items </Link>)
                </h1>

                {/*Delivery*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>User</p>
                        <p>123 Test Drive</p>
                        <p>Peg City, Canada</p>
                    </div>

                </div>
                {/*Items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
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
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        
                        
                    </div>
                </div>
            </div>
            
        </div>
    )
}



export default Payment
