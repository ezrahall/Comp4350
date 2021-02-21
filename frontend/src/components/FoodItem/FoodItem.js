import React from 'react'
import './FoodItem.css'

import { useStateValue } from '../../ContextAPI/StateProvider'



function FoodItem({heading,data}) {

    const [{basket},dispatch] = useStateValue();

    const addToBasket = (e) => {
        //dispatch the item in the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
        
                title: e.title,
                image: e.image,
                price: e.price,
                description: e.desc,
            },
        });
    }



    return (
        <div className='fooditem'>
            <h1 className='fooditem__heading'>{heading}</h1>
            <div className='fooditem__wrapper'>
                {data.map((product) => {
                    return(
                        <div className='fooditem__card'>
                            <div className='fooditem__content'>
                            <img className='fooditem__image' src={product.img} alt='' />        
                            <div className='fooditem__info'>
                                <h2 className='fooditem__title'>{product.title}</h2>
                                <p className='fooditem__desc'>{product.desc}</p>
                                <p className='fooditem__price'>${product.price}</p>
                                <button className='fooditem__button' onClick={(e) => addToBasket(product)}>{product.button}</button>
                                {/*Needs to be fixed, Subtotal not appearing */}
                            </div>          
                            </div>
                        </div>

                    );
                })}
            </div>




            
        </div>
    )
}

export default FoodItem
