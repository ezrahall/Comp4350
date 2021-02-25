import React from 'react'
import './Checkout.css'
import adImage from '../../../assets/images/Checkout-Banner.jpg'
import Subtotal from '../../Subtotal/Subtotal'
import { useStateValue } from '../../../ContextAPI/StateProvider'
import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct'


function Checkout() {

    const[{basket},dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout__ad' 
                src={adImage}
                alt='' 
                />
                <div>
                    <h3>Hello User </h3>
                    <h2 className='checkout__title'>Your Shopping Basket:</h2>
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

            <div className='checkout__right'>

                <Subtotal />

            </div>             
        </div>
    )
}

export default Checkout
