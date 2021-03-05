import React from 'react'

import styles from '../../../assets/styles/FeaturedItem.module.css'

function FeaturedItem() {
    return (
        <div className={styles.featuredItem}>
            <h1>Chicken of the Day</h1>
            <p>Spicy Shit</p>
            <button className={styles.featuredItem__button}>Order Now</button>
            
        </div>
    )
}

export default FeaturedItem