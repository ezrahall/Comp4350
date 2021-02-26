import React from 'react'
import './Card.css'


const Card = (props) => {

    return (
        <div className='card'>

            <img src={`https://safeats.ca/Api/Images/${props.id}`} alt={props.title + ' Logo'} />
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
