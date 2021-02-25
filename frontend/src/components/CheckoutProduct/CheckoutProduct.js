import React from 'react'
import { useStateValue } from '../../ContextAPI/StateProvider'
import './CheckoutProduct.css'

function CheckoutProduct({id,image,title,price}) {

    const [{basket}, dispatch] = useStateValue();

    const removeFromBasket = () => {

        dispatch({
            type : 'REMOVE_FROM_BASKET',
            id: id,
        })

    }

    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt='' 
            />

            <div className='checkoutProduct__info'>
                <p className='chekcoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <button onClick={removeFromBasket}>Remove</button>
            </div>



        </div>
    )
}

export default CheckoutProduct
