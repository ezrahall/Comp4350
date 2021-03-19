import React from "react";
import { useDispatch } from "react-redux";

import styles from "../../assets/styles/CheckoutProduct.module.css";
import { removeFromBasket as removeBasket } from "../../store/actions/cart";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const CheckoutProduct = (props) => {
  const dispatch = useDispatch();

  const removeFromBasket = () => {
    dispatch(removeBasket(props.id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutProduct}>
        <div className={styles.checkoutProduct__container}>
          <img
            className={styles.checkoutProduct__image}
            src={props.image}
            alt={props.title}
          />
          <div className={styles.checkoutProduct__info}>
            <div className={styles.chekcoutProduct__title}>{props.title}</div>

          </div>
          <div className={styles.checkoutProduct__price}>
              <small>$</small>
              <strong>{props.price}</strong>
            </div>
        </div>
        <div
          className={styles.checkoutProduct__remove}
          onClick={removeFromBasket}
        >
          <DeleteForeverIcon className={styles.checkoutProduct__removeBtn} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;


