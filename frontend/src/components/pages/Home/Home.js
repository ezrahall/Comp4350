import React from 'react';
import './Home.css'
import HomeBackground from '../images/Home-Background.jpg'
import Banner from '../../Banner/Banner'
import Card from '../../Card/Card'
import KFC from '../../images/KFC.jpg'
import Footer from '../../Footer/Footer';

function Home(props) {
    return (
        <div className='home'>
            

            <Banner />

            <h2>Available Restaurants</h2>
                   
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