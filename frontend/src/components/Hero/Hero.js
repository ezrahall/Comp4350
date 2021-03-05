import React from 'react'

import styles from '../../assets/styles/Hero.module.css'

function Hero(props) {
    return (
        <div className={styles.hero}>
            <div className={styles.hero__content}>
                <div className={styles.hero__items}>
                    <h1 className={styles.hero__title}>Here to Help</h1>
                    <button className={styles.hero__button}>Place Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default Hero