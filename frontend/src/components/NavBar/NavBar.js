import React, { Component } from 'react';
import { MenuItems } from './MenuItems.js';
// import { Button } from '../Button';
import './NavBar.css';

class NavBar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return(
            <nav className="NavBarItems">
                <h1 className="navbar-logo">Safeat</h1>
                <div className="menu-icon" onClick={this.handleClick}></div>
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