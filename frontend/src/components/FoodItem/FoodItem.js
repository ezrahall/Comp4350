import React from 'react';
import {useDispatch} from "react-redux";
import MCD from '../../assets/images/McD.jpg';

import styles from '../../assets/styles/FoodItem.module.css'
import {addToBasket as addBasket} from '../../store/actions/cart';

function FoodItem({heading,data}) {
    const dispatch = useDispatch();

    const addToBasket = (e) => {
        dispatch(addBasket({
            id: e.id,
            title: e.title,
            image: e.image,
            price: e.price,
            ingridients: e.ingridients
        }));
    };
    console.log(data)
    return (
        <div className={styles.fooditem}>
            <h1 className={styles.fooditem__heading}>Menu</h1>
            <div className={styles.fooditem__wrapper}>
                {data.map((product) => {
                    return(
                        <div className={styles.fooditem__card}>
                            <div className={styles.fooditem__content}>
                            <img className={styles.fooditem__image} src={MCD} alt='' />
                            <div className={styles.fooditem__info}>
                                <h2 className={styles.fooditem__title}>{product.name}</h2>
                                <p className={styles.fooditem__desc}>{product.description}</p>
                                <p className={styles.fooditem__price}>${product.price}</p>
                                <button className={styles.fooditem__button} onClick={(e) => addToBasket(product)}>Add To Cart</button>
                                {/*Needs to be fixed, Subtotal not appearing */}
                            </div>          
                            </div>
                        </div>

                    );
                })}
            </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FoodItem;
