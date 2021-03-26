import React from 'react'
import {Link} from 'react-router-dom'

import styles from '../../../assets/styles/pages/Success.module.css'
import Safeat from '../../../assets/images/SafeEat.svg'

const Success = () => {
    return (
        <div className={styles.success}>
            <div className={styles.success__container}>
                <div className={styles.success__title}>
                    Thank You. Your Order has been Placed !!
                </div>
                <div className={styles.success__subtitle}>
                    Together We Can Make A Difference
                </div>
                

                <div className={styles.success__content}>
                    <p className={styles.success__contentTeam}>
                        Thank you for being part of this wonderful community striving for a  healthier<br/> future. 
                        For you, we are now one step closer to make all of this go away. <br />
                        Yes,You have done this. We cannot appreciate this enough. United We Stand!!

                    </p>
                    <p className={styles.success__contentTeamName}>
                        - Safeat
                    </p>   
                    <div className={styles.success__contentImageContainer}>
                        <img src={Safeat} alt='' className={styles.success_contentImage}/>

                    </div>

                </div>

                <div className={styles.success__buttons}>
                    <Link to='/orderTracker'>
                    <button className={styles.success__buttonStyle1}>
                        Track Order
                    </button>
                    </Link>
                    <Link to='/home'>
                    <button className={styles.success__buttonStyle2}>Main Menu</button>
                    </Link>
                </div>
                
                


            </div>

            
        </div>
    )
}

export default Success
