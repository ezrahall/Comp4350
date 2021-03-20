import React from 'react'

import styles from '../../assets/styles/Hero.module.css'

const Hero = (props) => {
    return (
        <div className={styles.hero}>
            <div className={styles.hero__content}>
            
                
                <div className={styles.hero__items}>
                <h1 className={styles.hero__title}>{props.title}</h1>                
                </div>

        </div>
            
        </div>
    )
}

export default Hero