import React from 'react'
import {Button} from '@material-ui/core';

import styles from '../../assets/styles/Banner.module.css'

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
                <Button href='#restaurantSection' 
                    variant='outlined'>Explore
                </Button>

            </div>
        </div>

    )
}

export default Banner