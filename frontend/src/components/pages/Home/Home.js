import React from 'react';
import './Home.css'
import Banner from '../../Banner/Banner'
import Card from '../../Card/Card'
import KFC from '../../images/KFC.jpg'
import Footer from '../../Footer/Footer';
import {Link} from 'react-router-dom'
import {restData} from './restaurantData'

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

function Home(props) {
    return (
        <div className='home'>
            

            <Banner />


            <div className='home__title'>

                <h2>Available Restaurants Near: </h2>
                <select>
                    {distanceData.map((d) => (
                        <option key={d.id} value={d.id} >{d.distance} Km</option>

                    ))}
                    
                </select>
            </div>

            
                   
            <div className='home__card'>

                {restData.map((restaurant) => (
                    <Link to='/restaurantmenu' style={{ textDecoration: 'none' }}>
                        <Card image={KFC} title={restaurant.title} rating={restaurant.rating} description={restaurant.description} distance={restaurant.distance} />
    
                    </Link>


                ))}

            </div>
            <div className='home__card'>
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />


            </div>
            <div className='home__card'>
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />


            </div>

            <div className='home__card'>


            </div>

            


        
            <Footer />
                
            
            
            
        </div>
    );
}

export default Home;