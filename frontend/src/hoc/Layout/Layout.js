import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import RestaurantMenu from '../../components/pages/RestaurantMenu/RestaurantMenu';
function Layout(props) {
    return (
        <div>
            <NavBar />
            
            {props.children}
        </div>
    );
}

export default Layout;