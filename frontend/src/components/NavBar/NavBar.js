import React, { Component } from 'react';
import { MenuItems } from './MenuItems.js';
// import { Button } from '../Button';
import './NavBar.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import {Link} from 'react-router-dom'
import { useStateValue } from '../../ContextAPI/StateProvider.js';


function NavBar() {

    const [{basket},dispatch] = useStateValue();

    const state = { clicked: false }

    const handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    const handleSubmit = (event) => {
        //event.preventDefault();
    }

    
        return(
            <nav className="NavBarItems">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <h1 className="navbar-logo">Safeat</h1>
                </Link>
                
                <div className="menu-icon" onClick={handleClick}></div>
                <form  className="navbar-search" onSubmit={handleSubmit}>
                    <label className="search-logo">
                        Search
                        <input className="search-box" type="text" name="searchQuery" placeholder="Search Restaurants"/>
                    </label>
                        <input className="submit-search" type="submit" value="Submit" />
                </form>
                <ul className={state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName}
                                href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                    <Link to='/checkout' style={{ textDecoration: 'none' }}>
                        <div className='navbar-basket'>
                            <ShoppingBasketIcon />
                            <span
                            className='navbar-basketCount'>
                                {basket?.length}
                            </span>
                        </div>

                    </Link>
                </ul>
            </nav>
        )
    }


export default NavBar