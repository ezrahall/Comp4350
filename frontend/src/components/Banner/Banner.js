import React from 'react'
import BannerImage from '../../assets/images/banner-image2.jpg'
import {Button} from '@material-ui/core';

import styles from "../styles/Banner.module.css"

function Banner() {
    return (
        <div className={styles.banner}>

            <div className={styles.banner__info}>
                <h1>
                    With Safeat
                </h1>
                <h5>
                    Let us help you bring a safer tomorrow
                </h5>
                <Button 
                    variant="outlined">Explore
                </Button>


            </div>
            <div className={styles.banner__image}>
                <img
                src={BannerImage}
                alt='' 
                />

            </div>
            
        </div>
    )
}

export default Banner
