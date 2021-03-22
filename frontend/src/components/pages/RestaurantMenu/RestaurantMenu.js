import React, {useEffect, useState} from 'react'

import styles from '../../../assets/styles/pages/RestaurantMenu.module.css'
import Hero from '../../Hero/Hero'
import FoodItem from '../../FoodItem/FoodItem'
import NavBar from "../../NavBar/NavBar";
import {getRestaurantMenu} from "../../../services/restaurants/restaurantsService";

function RestaurantMenu() {
    const [menuItems, setMenuItems] = useState([])



    useEffect(() =>{
        let id = window.location.href.split('/');
        id = id[id.length-1]
        getRestaurantMenu(id)
            .then(data => setMenuItems(data))
    },[])

    return (
        <div className={styles.restaurantMenu}>
            <NavBar/>
            <Hero />
            <FoodItem data={menuItems}/>
        </div>
    )
}

export default RestaurantMenu;
