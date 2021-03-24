import React from 'react'
import {useDispatch} from 'react-redux';

import styles from '../../assets/styles/Card.module.css'
import {setRestaurant} from "../../store/actions/restaurant";

const Card = (props) => {
    const dispatch = useDispatch()

    const setCurrentRestaurant = () => {
        dispatch(setRestaurant({
            id: props.id,
            title: props.title,
            rating: props.rating,
            description: props.description,
            time: props.time
        }))
    }

    return (
        <div className={styles.card} onClick={setCurrentRestaurant}>
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