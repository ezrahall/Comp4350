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
            <div className='home__container'>
            <img
                className='home__image'
                src={HomeBackground}
                alt = ''
                    />

            </div>
            <Banner />
            <div className='home__cardContainer'>

                <div className='home__card'>
                <Card title='KFC' image={KFC} rating={4}/>
                <Card title='KFC' image={KFC} rating={4}/>
                <Card title='KFC' image={KFC} rating={4}/>

                </div>


                <div className='home__card'>
                <Card title='KFC' image={KFC} rating={4}/>
                <Card title='KFC' image={KFC} rating={4}/>
                <Card title='KFC' image={KFC} rating={4}/>

                </div>

                <Footer />




            </div>
        </div>
    );
}

export default Home;