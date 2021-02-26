import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

import './UserAddress.css';
import { AddressContext } from './address';

function UserAddress(props) {
    const FIND_RESTAURANTS = "Find Restaurants Nearby";
    const CHOOSE_ADDRESS = "Please choose an address from one of the options";
    const {addresses, token, hasError, respMessage, isLoading, enterAddress} = useContext(AddressContext)
    const [buttonAttr, setButtonAttr] = useState({name: FIND_RESTAURANTS, color: "primary"});
    const [newAddress, setNewAddress] = useState('')
    const [newToken, setNewToken] = useState(token)
    const [validAddress, setValidAddress] = useState(false)
    const [visible, setVisibility] = useState(false)
    const [completeAddress, setCompleteAddress] = useState('66 Chancellors Circle, Winnipeg, MB, Canada')

    const handleSubmit = (event) => {
        if(validAddress) {
            setCompleteAddress(newAddress)
        }
        else {
            event.preventDefault()
            setButtonAttr({name: CHOOSE_ADDRESS, color: "secondary"})
        }
    }

    const handleChange = (event) => {
        setNewAddress(event.target.value)
        setNewToken(token)
        setValidAddress(false)
        if(event.target.value != '') {
            enterAddress(newAddress, newToken)
            setVisibility(true)
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
        <div className="enter-address">
            <div className="image-container">
                <h1 className="title">Safeat: A Smarter Way To Eat</h1>
                <form onSubmit={handleSubmit} >
                        <div className="address-box">
                            <input type="text"
                                   onChange={handleChange} 
                                   placeholder="Please Enter Your Address"
                                   value={newAddress}/>
                            <SearchIcon />
                        </div>
                        <div className="address-list">
                            {visible && addresses.map(address => <li key={address.name} className="address-list-item">
                            <a onClick={handleClick}>{address.name}</a></li>)}
                        </div>
                        <Button className="address-button" type="submit" variant="contained" color={buttonAttr.color}>{buttonAttr.name}</Button>
                </form>
            </div> 
        </div>
    );
}

export default UserAddress;