import React from 'react'
import './RestaurantMenu.css'
import Hero from '../../Hero/Hero'
import FoodItem from '../../FoodItem/FoodItem'
import FeaturedItem from '../../FoodItem/FeaturedItem/FeaturedItem'
import Footer from '../../Footer/Footer'

function RestaurantMenu({title,image,description,restaurantSlogan}) {
    return (
        <div className='restaurantMenu'>

            <Hero />
            <FoodItem />

            <FeaturedItem />
            <FoodItem />
            <Footer />


            
        </div>
    )
}

export default RestaurantMenu
