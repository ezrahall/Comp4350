import React, {useState} from 'react';
import { MenuItems } from './MenuItems.js';
import './NavBar.css';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { useStateValue } from '../../ContextAPI/StateProvider.js';
import SearchIcon from '@material-ui/icons/Search';
import SafeEat from '../../assets/images/SafeEat.svg';


const NavBar = (props) => {
    const [searchQuery, setSearchQuery] = useState('')

    const [{basket},dispatch] = useStateValue();

    const state = { clicked: false }

    const handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchChanged(searchQuery);
    }

    
        return(
            <nav className="NavBarItems">
                <button
                    className='button-logo'
                    onClick={() => {
                    props.reset();
                    setSearchQuery('')
                }}>
                    <img className='nav-logo' alt='' src={SafeEat}/>
                </button>
                <div className="menu-icon" onClick={handleClick}></div>
                <form  className="navbar-search" onSubmit={handleSubmit}>
                    <div className="search-box">
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Search Restaurants"
                            value={searchQuery}
                            onChange={(data) => setSearchQuery(data.target.value)}/>
                        <button><SearchIcon /></button>
                    </div>
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
                        <div className='navbar-basket'>
                            <ShoppingBasketIcon />
                            <span
                            className='navbar-basketCount'>
                                {basket?.length}
                            </span>
                        </div>
                </ul>
            </nav>
        )
    }

export default NavBar