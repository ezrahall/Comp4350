import React from 'react'
import "./Banner.css"
import BannerImage from '../../assets/images/banner-image2.jpg'
import {Button} from '@material-ui/core';

function Banner() {
    return (
        <div className="banner">

            <div className="banner__info">
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
            <div className='banner__image'>
                <img
                src={BannerImage}
                alt='' 
                />

            </div>
            
        </div>
    )
}

export default Banner
