import React, {useEffect, useState} from 'react'

import styles from '../../../assets/styles/pages/RestaurantMenu.module.css'
import Hero from '../../Hero/Hero'
import FoodItem from '../../FoodItem/FoodItem'
import NavBar from "../../NavBar/NavBar";
import KFC from '../../../assets/images/KFC.jpg';
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
            <NavBar />
            <br />
            <Hero />
            <br />
            <div className={styles.restaurantMenu__titleContainer}>
                <div className={styles.restaurantMenu__title}>Menu:</div>

                <div className={styles.restaurantMenu__subtitle}>
                    Click below to select items
                </div>

            </div>
            {menuItems.map((item) => <FoodItem
                key={item.id}
                image={KFC}
                id={item.id}
                title={item.name}
                ing={item.description}
                price={item.price}
            />)}
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default RestaurantMenu;
