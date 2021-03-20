import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {useSelector} from "react-redux";

import styles from "../../assets/styles/CheckoutProduct.module.css";
import { removeFromBasket as removeBasket } from "../../store/actions/cart";
import { adjustItemQuantity as adjustQuantity } from "../../store/actions/cart";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const CheckoutProduct = (props) => {
  const dispatch = useDispatch();

  const basket = useSelector(state => state.cart.basket)


  const [input, setInput] = useState(0);
  const [basketID,setBasketID] = useState("");

  useEffect(() => {

    basket.forEach((item) => {
      if (item.id === props.id) {
        setBasketID(item.id)
        setInput(item.qty)
      }
    });

  }, [basket, props.id]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    dispatch(adjustQuantity({id: basketID, value: e.target.value}))
    
  };

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

        <div className={styles.checkoutProduct__qty}>
          <label htmlFor="qty">Qty</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            value={input}
            onChange={onChangeHandler}
          />
        </div>
        
        <div
          className={styles.checkoutProduct__remove}
          onClick={removeFromBasket}
        >
          <DeleteForeverIcon style={{ color: "#2a0080"}} className={styles.checkoutProduct__removeBtn} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;


