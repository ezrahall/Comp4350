import React, {useState} from 'react';
import { useHistory,Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Logo from '../../../assets/images/SafeEat.svg';
import styles from '../../../assets/styles/pages/UserAddress.module.css';
import {enterAddress} from '../../../services/address/address';
import {setAddress} from '../../../store/actions/adress';

const UserAddress = (props) => {
    const FIND_RESTAURANTS = 'Find Restaurants Nearby';
    const CHOOSE_ADDRESS = 'Please choose from one of the options';
    const [buttonAttr, setButtonAttr] = useState({name: FIND_RESTAURANTS});
    const [newAddress, setNewAddress] = useState('')
    const [addresses, setAddresses] = useState([])
    const [token, setToken] = useState('')
    const [validAddress, setValidAddress] = useState(false)
    const [visible, setVisibility] = useState(false)

    const dispatch = useDispatch()

    let history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault()
        if(validAddress) {
            dispatch(setAddress(newAddress))
            sessionStorage.setItem('address', newAddress)
            history.push('./home')
        }
        else {
            setButtonAttr({name: CHOOSE_ADDRESS})
        }
    }

    const handleChange = (event) => {
        setNewAddress(event.target.value)
        setToken(token)
        setValidAddress(false)
        if(event.target.value != '') {
            enterAddress(newAddress, token)
                .then((data) => {
                    setToken(data.token);
                    setAddresses(data.addresses)
                    setVisibility(true)
                })
        }
        else {
            setVisibility(false)
        }
    }

    const handleClick = (event) => {
        setNewAddress(event.target.textContent)
        setVisibility(false)
        setValidAddress(true)
        setButtonAttr({name: FIND_RESTAURANTS})
    }

    const handleFocus = () => {
        setVisibility(false)
    }

    return (
        <div className={styles.enter__address} onClick={handleFocus}>
            <div className={styles.address__buttonsContainer}>
                <Link to='/login'>
                    <button className={styles.address__login} color={buttonAttr.color} variant='contained' type='submit'>Login</button>
                </Link>
                <Link to='/signup'>
                    <button className={styles.address__signUp}>Sign Up</button>
                </Link>
            </div>

            <div className={styles.image__container}>
            <img src={Logo} alt={'logo'}/>
                <form onSubmit={handleSubmit} >
                        <div className={styles.address__box}>
                            <input type='text'
                                   onChange={handleChange} 
                                   placeholder='Please Enter Your Address'
                                   value={newAddress}/>
                        </div>
                        <div className={styles.address__list}>
                            {visible && addresses.map(address => <li key={address.name} className={styles.address__listitem}>
                            <a onClick={handleClick}>{address.name}</a></li>)}
                        </div>
                        {!visible && <button className={styles.address__button} type='submit'>{buttonAttr.name}</button>}
                </form>
            </div> 
        </div>
    );
}

export default UserAddress;