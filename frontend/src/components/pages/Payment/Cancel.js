import React from 'react'
import {Link} from 'react-router-dom'

import styles from '../../../assets/styles/pages/Cancel.module.css'
import Safeat from '../../../assets/images/SafeEat.svg'


const Cancel = () =>  
{
    return (
        <div className={styles.cancel}>
            <div className={styles.cancel__container}>
                <div className={styles.cancel__title}>
                    Sorry!! But something went wrong !! 
                </div>
                
                <div className={styles.cancel__content}>
                    <p className={styles.cancel__contentTeam}>
                        We apologize for the inconvenience. Don't worry<br/> 
                        We haven't charged you for anything yet. But even then  <br />
                        if you do face any problem, don't hesitate to contact us.

                    </p>
                    <p className={styles.cancel__contentTeamName}>
                        - Safeat
                    </p>   
                    <div className={styles.cancel__contentImageContainer}>
                        <img src={Safeat} alt='' className={styles.cancel_contentImage}/>

                    </div>

                </div>

                <div className={styles.cancel__buttons}>
                    <Link to='/home'>
                    <button className={styles.cancel__buttonStyle}>Main Menu</button>
                    </Link>
                </div>
            </div>   
        </div>
    )
}

export default Cancel
