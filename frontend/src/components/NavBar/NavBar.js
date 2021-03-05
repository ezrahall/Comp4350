import React, {useState} from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";

import { MenuItems } from './MenuItems.js';
import styles from '../../assets/styles/NavBar.module.css';
import SafeEat from '../../assets/images/SafeEat.svg';

const NavBar = (props) => {
    const [searchQuery, setSearchQuery] = useState('')
    const basket = useSelector(state => state.cart.basket)

    const history = useHistory()

    const handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchChanged(searchQuery);
    }

    const logoClicked = () => {
        if(props.reset){
            props.reset();
            setSearchQuery('')
        }else{
            history.push('/home')
        }
    }
    
        return(
            <nav className={styles.NavBarItems}>
                <button
                    className={styles.button__logo}
                    onClick={() => {logoClicked()}
                }>
                    <img className={styles.nav__logo} alt='' src={SafeEat}/>
                </button>
                <div className={styles.menu__icon} onClick={handleClick}></div>
                <form  className={styles.navbar__search} onSubmit={handleSubmit}>
                    <div className={styles.search__box}>
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Search Restaurants"
                            value={searchQuery}
                            onChange={(data) => setSearchQuery(data.target.value)}/>
                        <button><SearchIcon /></button>
                    </div>
                </form>
                <ul className={styles.nav__menu}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={styles.nav__links}
                                href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                        <div className={styles.navbar__basket}>
                            <ShoppingBasketIcon/>
                            <span
                            className={styles.navbar__basketCount}>
                                {basket?.length}
                            </span>
                        </div>
                </ul>
            </nav>
        )
    }

export default NavBar