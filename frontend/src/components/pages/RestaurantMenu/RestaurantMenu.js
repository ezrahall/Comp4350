import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';

import styles from '../../../assets/styles/pages/RestaurantMenu.module.css'
import Hero from '../../Hero/Hero'
import FoodItem from '../../FoodItem/FoodItem'
import NavBar from '../../NavBar/NavBar';
import KFC from '../../../assets/images/KFC.jpg';
import ClickImage from '../../../assets/images/menuClick.png'
import ItemImage from '../../../assets/images/menuItemImage.jpg'
import {getRestaurantMenu} from '../../../services/restaurants/restaurantsService';

const RestaurantMenu = () => {
    const [menuItems, setMenuItems] = useState([])
    const restaurant = useSelector(state => state.restaurant.restaurant)
    const basket = useSelector(state => state.cart.basket)



    useEffect(() =>{
        let id = window.location.href.split('/');
        id = id[id.length-1]
        getRestaurantMenu(id)
            .then(data => setMenuItems(data))
    },[])

    return (
        <div className={styles.menu}>
            <NavBar />
            <br />
            <Hero />
            <br />
            <div className={styles.menu__titleContainer}>
                

                <div className={styles.menu__subtitle}>
                    Delivery Time: {restaurant.time}
                </div>

            </div>
            { basket?.length === 0 ?             
                <div className={styles.menu__clickContainer} >
                <img className={styles.menu__menuImage}  src={ClickImage} alt ='' />
                </div>
                :
                <div></div>
                
            }
            {menuItems.map((item) => <FoodItem
                key={item.id}
                image={KFC}
                id={item.id}
                title={item.name}
                ing={item.description}
                price={item.price}
            />)}
            <div className={styles.menu__itemImageContainer} >
                <img className={styles.menu__menuItem}  src={ItemImage} alt ='' />
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default RestaurantMenu;
