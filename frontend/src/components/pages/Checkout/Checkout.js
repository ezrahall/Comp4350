import React, { useState } from 'react';
import adImage from '../../../assets/images/Checkout-Banner.jpg';
import { useSelector } from "react-redux";
import { useStripe } from "@stripe/react-stripe-js";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core"
import {useDispatch} from 'react-redux'


import CheckoutProduct from '../../CheckoutProduct/CheckoutProduct';
import styles from '../../../assets/styles/pages/Checkout.module.css';
import Subtotal from '../../Subtotal/Subtotal';
import NavBar from '../../NavBar/NavBar';
import {genCookies} from '../../../services/genCookies'
import {setAddress} from '../../../store/actions/adress';
import AutoCompleteTextField from '../../AutoCompleteTextField/AutoCompleteTextField';

function Checkout() {
    const basket = useSelector(state => state.cart.basket)
    const restaurant = useSelector(state => state.restaurant.restaurant)
    const user_address = useSelector(state => state.user.address)
    const user_name = useSelector(state => state.user.user.name)
    
    const [ openChangeAddress, setOpenChangeAddress ] = useState(false)
    const [ newAddress, setNewAddress ] = useState('')
    const dispatch = useDispatch()

    const stripe = useStripe();
    

    const handleSubmit = async (event) => {

        event.preventDefault();        
    
        fetch('http://localhost:5000/Api/Restaurant/Payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
            basket: basket,
            restaurant: restaurant,
            cookies: genCookies(),
            address: user_address,

          }),
        })
        .then((response) => response.json())
        .then((session) => {
          stripe.redirectToCheckout({
            sessionId: session.id
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      };

      const handleClick = () => {
        setOpenChangeAddress(true)
      };

      const handleAddressChange = () => {
        sessionStorage.setItem('address', newAddress)
        dispatch(setAddress(newAddress))
        handleClose()
        setNewAddress('')
      };

      const handleClose = () => {
        setOpenChangeAddress(false)
      }

    return (
        <div className={styles.checkout}>
            <NavBar />
            <div className={styles.checkout__left}>
                <img
                    className={styles.checkout__ad}
                    src={adImage}
                    alt=''
                />
                <div className={styles.checkout__titleContainer}>
                    <p>Hello {user_name} </p>
                    <p className={styles.checkout__title}>Your Shopping Basket:</p>
                </div>
                <br />
    
                {basket.map(item => (
                    <CheckoutProduct 
                        key = {item.id}
                        id = {item.id}
                        title = {item.title}
                        image = {item.image}
                        price = {item.price}
                        ingredients = {item.ingredients}
                    />
                ))}
            </div>
            <div className={styles.checkout__subtotal}>
                <Subtotal/>
                <button onClick={handleSubmit}>Proceed to Pay</button>
            </div>
            <br />
            <div>
              <h4>Your order will be delivered to: {user_address} </h4>
              <Button color="secondary" variant="contained" style={{margin: '10px'}} onClick={handleClick}>Change delivery address</Button>
            </div>

            <Dialog  fullWidth={true} maxWidth="sm" open={openChangeAddress} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        <form noValidate autoComplete="off">
                            <div>
                                <label htmlFor="newAddress">Enter new address</label>
                                <AutoCompleteTextField id="newAddress" value={newAddress} fullWidth callback={setNewAddress}/>
                            </div>
                        </form> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.actionBtns}>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                      Cancel
                    </Button>
                    <Button onClick={handleAddressChange} color="primary" variant="contained">
                      Change
                    </Button> 
                </DialogActions>
            </Dialog>
                  
        </div>
    )
}

export default Checkout