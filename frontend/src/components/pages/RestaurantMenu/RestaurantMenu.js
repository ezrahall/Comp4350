import React from 'react'

import styles from '../../../assets/styles/pages/RestaurantMenu.module.css'
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
            <FoodItem id="1" title="Chicken" ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda" price="13.33" />
            <FoodItem id="2" title="Chicken" ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda" price="13.33" />
            <FoodItem id="3" title="Chicken" ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda" price="13.33" />
            <FoodItem id="4" title="Chicken" ing="ashdkajshdaljsdhasjdgakhjsdgashdgaslhjdagsda" price="13.33" />
            <Footer />
        </div>
    )
}

export default RestaurantMenu