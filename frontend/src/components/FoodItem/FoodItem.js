import React from 'react'

import styles from '../styles/FoodItem.module.css'
import {useDispatch, useSelector} from "react-redux";



function FoodItem({heading,data}) {
    const basket = useSelector(state => state.cart.basket)
    const dispatch = useDispatch();


    const addToBasket = (e) => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                
                id: e.id,
                title: e.title,
                image: e.image,
                price: e.price,
                ingridients: e.ingridients,
            },
        });
    }



    return (
        <div className={styles.fooditem}>
            <h1 className={styles.fooditem__heading}>{heading}</h1>
            <div className={styles.fooditem__wrapper}>
                {data.map((product) => {
                    return(
                        <div className={styles.fooditem__card}>
                            <div className={styles.fooditem__content}>
                            <img className={styles.fooditem__image} src={product.img} alt='' />        
                            <div className={styles.fooditem__info}>
                                <h2 className={styles.fooditem__title}>{product.title}</h2>
                                <p className={styles.fooditem__desc}>{product.desc}</p>
                                <p className={styles.fooditem__price}>${product.price}</p>
                                <button className={styles.fooditem__button} onClick={(e) => addToBasket(product)}>{product.button}</button>
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
