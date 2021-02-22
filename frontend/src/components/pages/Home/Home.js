import React from 'react';
import './Home.css'
import Banner from '../../Banner/Banner'
import Card from '../../Card/Card'
import KFC from '../../images/KFC.jpg'
import Footer from '../../Footer/Footer';
import {Link} from 'react-router-dom'

function Home(props) {
    return (
        <div className='home'>
            

            <Banner />

            <h2>Available Restaurants</h2>
                   
            <div className='home__card'>

                <Link to='/restaurantmenu'>
                    <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />
                </Link>
                
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />
                <Card image={KFC} title='KFC'rating='9' description='LorepIpsum' />

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