import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../assets/styles/FoodItem.module.css";
import { decreaseItemQuantity as decreaseQuantity } from "../../store/actions/cart";
import { addToBasket as addBasket } from "../../store/actions/cart";
import RemoveIcon from "@material-ui/icons/RemoveCircle";

const FoodItem = (props) => {
    const dispatch = useDispatch();

    const basket = useSelector((state) => state.cart.basket);

    const [itemCount, setItemCount] = useState(0);
    const [activeItem, setActiveItem] = useState(false);

    const decreaseItemQuantity = () => {
        dispatch(decreaseQuantity(props.id));
    };
    useEffect(() => {
        let count = 0;

        basket.forEach((item) => {
            if (item.id === props.id) {
                count += item.qty;
            }
        });

        setItemCount(count);
    }, [basket, itemCount, props.id]);

    const addToBasket = () => {
        dispatch(
            addBasket({
                id: props.id,
                title: props.title,
                image: props.image,
                price: props.price,
                ingridients: props.ingridients,
            })
        );
    };
    console.log(props)
    return (
        <div className={styles.fooditem__container}>
            <div
                className={styles.fooditem}
                onClick={(e) => {
                    addToBasket();
                    setActiveItem(true);
                }}
            >
                <div className={styles.fooditem__card}>
                    <img className={styles.fooditem__image} src={props.image} alt="" />

                    <div className={styles.fooditem__info}>
                        <h2 className={styles.fooditem__title}>{props.title}</h2>
                        <p className={styles.fooditem__ing}>
                            {props.ing} {/* Ingredients Oerflows */}
                        </p>
                    </div>
                    <p className={styles.fooditem__price}>${props.price}</p>
                </div>
            </div>

            {activeItem && itemCount !== 0 ? (
                <div className={styles.fooditem_remove}  onClick={decreaseItemQuantity}>
                    {itemCount}
                    <RemoveIcon style={{ color: "#26004D" }}/>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default FoodItem;
