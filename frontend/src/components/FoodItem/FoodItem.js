import React from 'react'
import './FoodItem.css'
import {foodData} from './data'

function FoodItem() {
    return (
        <div className='fooditem'>
            <h1 className='fooditem__heading'>Heading</h1>
            <div className='fooditem__wrapper'>
                {foodData.map((product, index) => {
                    return(
                        <div className='fooditem__card'>
                            <div className='fooditem__content'>
                            <img className='fooditem__image' src={product.img} alt='' />        
                            <div className='fooditem__info'>
                                <h2 className='fooditem__title'>{product.title}</h2>
                                <p className='fooditem__desc'>{product.desc}</p>
                                <p className='fooditem__price'>{product.price}</p>
                                <button className='fooditem__button'>{product.button}</button>
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
