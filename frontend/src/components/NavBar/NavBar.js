import React, {useState} from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import SearchIcon from '@material-ui/icons/Search';

import { MenuItems } from './MenuItems.js';
import { useStateValue } from '../../ContextAPI/StateProvider.js';
import styles from '../styles/NavBar.module.css';
import SafeEat from '../../assets/images/SafeEat.svg';



const NavBar = (props) => {
    const [searchQuery, setSearchQuery] = useState('')


    const state = { clicked: false }

    const handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchChanged(searchQuery);
    }

    
        return(
            <nav className={styles.NavBarItems}>
                <button
                    className={styles.button__logo}
                    onClick={() => {
                    props.reset();
                    setSearchQuery('')
                }}>
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
                            <ShoppingBasketIcon />
                            <span
                            className={styles.navbar__basketCount}>
                                {0}
                            </span>
                        </div>
                </ul>
            </nav>
        )
    }

export default NavBar