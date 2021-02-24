import React, {useEffect} from 'react'
import './Card.css'
import {getRestaurantImage} from '../../services/restaurants/restaurantsService'
//import Star from '../images/ratingStar.png'


function Card(props) {

    useEffect(() => {
        getRestaurantImage(props.id)
            .then()
            .catch((error) => console.log(error))
    },[])

    return (
        <div className='card'>

            <img src={props.image} alt={props.title + ' Logo'} />
            <div className='card__info'>
            <h2>{props.title}</h2>
                <h4>{props.description}</h4>
                {/*<h3>{props.rating} <img className='card__starImage' src={Star} alt='' /> </h3>*/}
                <h4>Estimated Time: {props.time}</h4>
            </div>
        </div>
    )
}

export default Card
