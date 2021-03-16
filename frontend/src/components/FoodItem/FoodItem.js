import React from 'react';
import {useDispatch} from "react-redux";

import styles from '../../assets/styles/FoodItem.module.css'
import {addToBasket as addBasket} from '../../store/actions/cart';
import RemoveIcon from '@material-ui/icons/RemoveCircle'

const FoodItem = (props) => {
    const dispatch = useDispatch();

    const addToBasket = () => {
        dispatch(addBasket({
            id: props.id,
            title: props.title,
            image: props.image,
            price: props.price,
            ingridients: props.ingridients
        }));
    };

    return (
        <div className={styles.fooditem} onClick={(e) => addToBasket()}>
            
        <div className={styles.fooditem__card}>
        <img className={styles.fooditem__image} src={props.image} alt="" />
            
        <div className={styles.fooditem__info}>
            <h2 className={styles.fooditem__title}>{props.title}</h2>
            <p className={styles.fooditem__ing}>
            {props.ing} {/* Ingredients Oerflows */}
            </p>
            {/*Needs to be fixed, Subtotal not appearing */}
        </div>
        <p className={styles.fooditem__price}>${props.price}</p>
        </div>
        <div className={styles.fooditem_remove}>
            1
            <RemoveIcon />
        </div>
    </div>
    )
}

export default FoodItem