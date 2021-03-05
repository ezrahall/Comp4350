import React from 'react'

import styles from '../../assets/styles/Card.module.css'

const Card = (props) => {
    return (
        <div className={styles.card}>
            <img src={`https://safeats.ca/Api/Images/${props.id}`} alt={props.title + ' Logo'} />
            <div className={styles.card__info}>
            <h2>{props.title}</h2>
                <h4>{props.description}</h4>
                {/*<h3>{props.rating} <img className='card__starImage' src={Star} alt='' /> </h3>*/}
                <h4>Estimated Time: {props.time}</h4>
            </div>
        </div>
    )
}

export default Card