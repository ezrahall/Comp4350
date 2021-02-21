import React from 'react'
import './RestaurantMenu.css'
import Hero from '../../Hero/Hero'
import FoodItem from '../../FoodItem/FoodItem'
import FeaturedItem from '../../FoodItem/FeaturedItem/FeaturedItem'
import Footer from '../../Footer/Footer'
import {foodData} from '../../FoodItem/data'

function RestaurantMenu() {
    return (
        <div className='restaurantMenu'>
            <Hero />
            <FoodItem data={foodData} heading='Chicken' />

            <FeaturedItem />

            <FoodItem data={foodData} heading='Beef' />

            <Footer />


            
        </div>
    )
}

export default RestaurantMenu
