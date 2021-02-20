import React from 'react'
import './Card.css'
import Star from '../images/ratingStar.png'


function Card({title,image,description,rating,distance}) {
    return (
        <div className='card'>

            <img src={image} alt='' />
            <div className='card__info'>
            <h2>{title}</h2>
                <h4>{description}</h4>
                <h3>{rating} <img className='card__starImage' src={Star} /> </h3>
                <h4>Distace Away: {distance}</h4>

            </div>
            
            
        </div>
    )
}

export default Card
