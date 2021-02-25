import React, { useContext, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

import './UserAddress.css';
import { AddressContext } from './address';
import bannerimage from '../../../assets/images/banner-image.jpg'


function UserAddress(props) {
    const FIND_RESTAURANTS = "Find Restaurants Nearby";
    const CHOOSE_ADDRESS = "Please choose an address from one of the options";
    const {addresses, token, hasError, respMessage, isLoading, enterAddress} = useContext(AddressContext)
    const [addrButtonName, setAddrButtonName] = useState(FIND_RESTAURANTS);
    const [newAddress, setNewAddress] = useState(addresses)
    const [newToken] = useState(token)
    const state = {validAddress: false};

    // const {address}  = useContext(UserContext);
    // const [newAddress, setNewAddress] = useState(address);

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddrButtonName(CHOOSE_ADDRESS);
        // if(!this.state.validAddress)
        // {
            
        // }
        // const data = {
        //     address: newAddress
        // }
    }

    const handleChange = (event) => {
        setNewAddress(event.target.value)
        const data = {
            address: newAddress,
            token: newToken
        }
        enterAddress(newAddress, newToken)
    }

    return (
        <div className="enter-address">
            <div className="image-container">
                <h1 className="title">Safeat A Smarter Way To Eat</h1>
                <form onSubmit={handleSubmit} >
                        <div className="address-box">
                            <input type="text" onChange={handleChange} placeholder="Please Enter Your Address"/>
                            <SearchIcon />
                        </div>
                        <Button className="address-button" type="submit" variant="contained" color="primary">{addrButtonName}</Button>
                </form>
            </div> 
        </div>
    );
}

export default UserAddress;