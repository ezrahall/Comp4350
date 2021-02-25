import React, {useEffect, useState} from 'react';

import './Home.css'
import Banner from '../../Banner/Banner'
import Card from '../../Card/Card'
import KFC from '../../images/KFC.jpg'
import {Link} from 'react-router-dom'
import Spinner from '../../../ui/Spinner/Spinner';
import Tags from '../../Tags/Tags';
import {getRestaurants,addRestaurants} from '../../../services/restaurants/restaurantsService';

const distanceData = [
    {
        id: 1,
        distance: 5
    },
    {
        id: 2,
        distance: 10
    },
    {
        id: 3,
        distance: 15
    },
    {
        id: 4,
        distance: 20
    },
]

const Home = (props) => {
    const [restaurants,setRestaurants] = useState([])
    const [distance, setDistance] = useState(5)
    const [loadingAll, setLoadingAll] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [filtered, setFiltered] = useState(false)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        setLoadingAll(true)
        getRestaurants(5, filter)
            .then((data) => {
                setRestaurants(data)
                setLoadingAll(false)
            })
    }, [])

    const showMoreRestaurants = () =>{
        let restaurantsArray =  restaurants
        setLoadingMore(true)
        addRestaurants(restaurants.length, distance, filter)
            .then((data) => {
               restaurantsArray = restaurantsArray.concat(data);
                setRestaurants(restaurantsArray)
                setLoadingMore(false)
            })
            .catch((e) => console.log(e))
    }

    const distanceChange = (newDistance) =>{
        setLoadingAll(true)
        getRestaurants(newDistance, filter)
            .then((data) => {
                setRestaurants(data)
                setLoadingAll(false)
            })
        setDistance(newDistance)
    }

    const selectItem = (item) => {
        setLoadingAll(true)
        setFilter(item)
        setFiltered(true)
        getRestaurants(distance, item)
            .then((data) => {
                setRestaurants(data);
                setLoadingAll(false)
            })
    }

    return (
        <div className='home'>
            {!filtered && <Banner />}
            <div className='tags'>
                <Tags
                    selectItem={selectItem}
                />
            </div>
            {filtered && <div>
                <h2 className='search__header'>Search Results For: {filter}</h2>
            </div>}
            <div className='home__title'>
                <h2>Available Restaurants Near: </h2>
                <select
                    onChange={(change) => distanceChange(change.target.value)}
                >
                    {distanceData.map((d) => (
                        <option key={d.id} value={d.distance}>{d.distance} Km</option>
                    ))}
                </select>
            </div>
            {loadingAll ?
                <Spinner/>
                : restaurants.length == 0 ?
                    <div className='no__restaurants'>
                        <h2>No Available Restaurants In The Area</h2>
                    </div>
                    : <div>
                        <div className='home__card'>

                            {restaurants.map((restaurant) => (
                                <Link key={restaurant.id} to='/restaurantmenu' style={{ textDecoration: 'none' }}>
                                    <Card id ={restaurant.id} image={KFC} title={restaurant.name} rating={restaurant.rating} description={restaurant.description} time={restaurant.delivery_time} />
                                </Link>
                            ))}
                        </div>
                {loadingMore ?
                    <Spinner/>
                    : <button
                        className='show__more'
                        onClick={() => showMoreRestaurants()}
                    >
                        Show More
                    </button>
                }
            </div>}
        </div>
    );
}
export default Home;