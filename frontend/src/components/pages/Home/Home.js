import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

import styles from '../../../assets/styles/pages/Home.module.css'
import Banner from '../../Banner/Banner'
import Card from '../../Card/Card'
import Spinner from '../../../ui/Spinner/Spinner';
import Tags from '../../Tags/Tags';
import {getRestaurants,addRestaurants} from '../../../services/restaurants/restaurantsService';
import NavBar from '../../NavBar/NavBar';

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
    const address = useSelector(state => state.user.address)

    const history = useHistory();

    useEffect(() => {
        setLoadingAll(true)
        getRestaurants(5, filter, address)
            .then((data) => {
                console.log(data)
                setRestaurants(data)
                setLoadingAll(false)
            })
    }, [])

    const showMoreRestaurants = () =>{
        let restaurantsArray =  restaurants
        setLoadingMore(true)
        addRestaurants(restaurants.length, distance, filter, address)
            .then((data) => {
               restaurantsArray = restaurantsArray.concat(data);
                setRestaurants(restaurantsArray)
                setLoadingMore(false)
            })
            .catch((e) => console.log(e))
    }

    const distanceChange = (newDistance) =>{
        setLoadingAll(true)
        getRestaurants(newDistance, filter, address)
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
        getRestaurants(distance, item, address)
            .then((data) => {
                setRestaurants(data);
                setLoadingAll(false)
            })
    }

    const goToAddress = () => {
        history.push('./')
    }

    return (
        <div className={styles.home}>
            <NavBar
                searchChanged={selectItem}
                reset={() => {
                    setFiltered(false);
                    setFilter('')
                    distanceChange(distance)
                }}
            />
            {!filtered && <Banner />}
            <div className={styles.tags}>
                <Tags
                    selectItem={selectItem}
                    title={'Cuisine Categories'}
                />
            </div>
            <div className={styles.home__title}>
                <div>
                    <h3>Available Restaurants Within: </h3>
                    <select
                        onChange={(change) => distanceChange(change.target.value)}
                    >
                        {distanceData.map((d) => (
                            <option key={d.id} value={d.distance}>{d.distance} Km</option>
                        ))}
                    </select>
                </div>
                    <div>
                        <h3> of {address}</h3>
                        <button className={styles.change} onClick={() => goToAddress()}>Change Address</button>
                    </div>
            </div>
            {filtered && <div>
                <h2 className={styles.search__header}>Search Results For: {filter}</h2>
            </div>}

            {loadingAll ?
                <Spinner/>
                : restaurants?.length == 0 ?
                    <div className={styles.no__restaurants}>
                        <h2>No Available Restaurants In The Area</h2>
                    </div>
                    : <div>
                        <div className={styles.home__card}>

                            {restaurants?.map((restaurant) => (
                                <Link key={restaurant.id} to={'/restaurantmenu/'+restaurant.id} style={{ textDecoration: 'none' }}>
                                    <Card id ={restaurant.id} title={restaurant.name} rating={restaurant.rating} description={restaurant.description} time={restaurant.delivery_time} />
                                </Link>
                            ))}
                        </div>
                {loadingMore ?
                    <Spinner/>
                    : <button
                        className={styles.show__more}
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