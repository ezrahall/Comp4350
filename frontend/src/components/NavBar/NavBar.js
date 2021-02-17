import React, { Component } from 'react';
import { MenuItems } from './MenuItems.js';
// import { Button } from '../Button';
import './NavBar.css';

class NavBar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    handleSubmit = (event) => {
        //event.preventDefault();
    }

    render() {
        return(
            <nav className="NavBarItems">
                <h1 className="navbar-logo">Safeat</h1>
                <div className="menu-icon" onClick={this.handleClick}></div>
                <form  className="navbar-search" onSubmit={this.handleSubmit}>
                    <label className="search-logo">
                        Search
                        <input className="search-box" type="text" name="searchQuery" placeholder="Search Restaurants"/>
                    </label>
                        <input className="submit-search" type="submit" value="Submit" />
                </form>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
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
                </ul>
            </nav>
        )
    }
}

export default NavBar