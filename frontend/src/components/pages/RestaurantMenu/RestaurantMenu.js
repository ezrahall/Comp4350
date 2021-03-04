import React from 'react'


import styles from '../../styles/pages/RestaurantMenu.module.css'
import Hero from '../../Hero/Hero'
import FoodItem from '../../FoodItem/FoodItem'
import FeaturedItem from '../../FoodItem/FeaturedItem/FeaturedItem'
import Footer from '../../Footer/Footer'
import {foodData} from '../../FoodItem/data'
import NavBar from "../../NavBar/NavBar";

function RestaurantMenu() {
    return (
        <div className={styles.restaurantMenu}>
            <NavBar/>
            <Hero />
            <FoodItem data={foodData} heading='Chicken' />

            <FeaturedItem />

            <FoodItem data={foodData} heading='Beef' />

            <Footer />


            
        </div>
    )
}

export default RestaurantMenu
