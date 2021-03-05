import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import Logo from '../../../assets/images/SafeEat.svg';
import styles from '../../../assets/styles/pages/UserAddress.module.css';
import {enterAddress} from '../../../services/address/address';
import {setAddress} from '../../../store/actions/adress';

function UserAddress(props) {
    const FIND_RESTAURANTS = "Find Restaurants Nearby";
    const CHOOSE_ADDRESS = "Please choose an address from one of the options";
    const [buttonAttr, setButtonAttr] = useState({name: FIND_RESTAURANTS, color: "primary"});
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
            history.push('./home')
        }
        else {
            setButtonAttr({name: CHOOSE_ADDRESS, color: "secondary"})
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
        setNewAddress(event.target.innerText)
        setVisibility(false)
        setValidAddress(true)
        setButtonAttr({name: FIND_RESTAURANTS, color: "primary"})
    }

    return (
        <div className={styles.enter__address}>
            <div className={styles.image__container}>
            <img src={Logo} alt={'logo'}/>
                <form onSubmit={handleSubmit} >
                        <div className={styles.address__box}>
                            <input type="text"
                                   onChange={handleChange} 
                                   placeholder="Please Enter Your Address"
                                   value={newAddress}/>
                            <SearchIcon />
                        </div>
                        <div className={styles.address__list}>
                            {visible && addresses.map(address => <li key={address.name} className={styles.address__listitem}>
                            <a onClick={handleClick}>{address.name}</a></li>)}
                        </div>
                        <Button style={{marginTop:'60px'}} className={styles.address__button} type="submit" variant="contained" color={buttonAttr.color}>{buttonAttr.name}</Button>
                </form>
            </div> 
        </div>
    );
}

export default UserAddress;